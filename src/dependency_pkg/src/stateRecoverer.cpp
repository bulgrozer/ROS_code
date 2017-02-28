#include <stdio.h>
#include <string>

#include "ros/ros.h"
#include "functionnal_pkg/velOrder.h"
#include "dependency_pkg/stateMsg.h"
#include <std_msgs/Float64.h>
#include <std_msgs/Bool.h>

#define FOLLOWER_MODE		0
#define MASTER_MODE			1
#define UNKNOWN_MODE		-1

using namespace std;

class stateRecoverer
{
	private :
		dependency_pkg::stateMsg savedState;		
		ros::Subscriber subVel, subOrd, subState, subMod;
		ros::Publisher  pubVel, pubOrd, pubState;
		ros::NodeHandle nsVel, nsOrd, nsMod, nsState, npVel, npOrd, npState;
		int mode;

	public :
		stateRecoverer()
		{
			savedState.velPriority = 0;
			savedState.velData = 0;
			savedState.disData = 0;
			savedState.velRelease = 1;

			ros::NodeHandle nsMod;			
			subMod = nsMod.subscribe("redundancyMode_topic",1,&stateRecoverer::updateMode,this);
			// Master Publishing setup
			ros::NodeHandle npState;
			pubState = npState.advertise<dependency_pkg::stateMsg>("/state_topic",1);
			// Follower Publishing setup
			ros::NodeHandle npVel;
			pubVel = npVel.advertise<functionnal_pkg::velOrder>("chassis/velOrder_topic",1);
			ros::NodeHandle npOrd;
			pubOrd = npOrd.advertise<std_msgs::Float64>("distanceOrder_topic",1);

			mode = UNKNOWN_MODE; 	// Waiting to know the mode of the Raspberry Pi.
		}



	private :
		void updateMode(const std_msgs::Bool& m)
		{
			if (m.data  != mode)
			{
				if (m.data == MASTER_MODE)
				{
					ros::NodeHandle nsVel;
					subVel = nsVel.subscribe("velOrder_topic",1,&stateRecoverer::updateStateVel_master,this);
					ros::NodeHandle nsOrd;
					subOrd = nsOrd.subscribe("distanceOrder_topic",1,&stateRecoverer::updateStateOrd_master,this);
					if (mode == FOLLOWER_MODE)
					{	// Shutdown : passage de Master a Follower.
						subState.shutdown();
						launchMasterMode();
					}
					mode = MASTER_MODE;
				}
				else if (m.data == FOLLOWER_MODE)
				{
					ros::NodeHandle nsState;
					subState = nsState.subscribe("state_topic",1,&stateRecoverer::updateSavedState_follower,this);
					if (mode == MASTER_MODE)
					{	// debut du mode degrade.
						subVel.shutdown();
						subOrd.shutdown();
					}
					mode = FOLLOWER_MODE;
				}
 
			}
		}

		void launchMasterMode()
		{
			functionnal_pkg::velOrder vel;
			vel.priority = savedState.velPriority;
			vel.data = savedState.velData;
			vel.release = savedState.velRelease;
			pubVel.publish(vel);

			std_msgs::Float64 Ord;
			Ord.data = savedState.disData;
			pubOrd.publish(Ord);
		}

		void updateStateVel_master(const functionnal_pkg::velOrder& vel)
		{
			savedState.velPriority = vel.priority;
			savedState.velData = vel.data;
			savedState.velRelease = vel.release;

			if (mode == MASTER_MODE)
			{
				dependency_pkg::stateMsg smsg = savedState;
				pubState.publish(smsg);
			}
			else
				ROS_INFO("ERROR : asked to update saved velocity order from inher values  while the system is in FOLLOWER Mode.");
		}

		void updateStateOrd_master(const std_msgs::Float64& dist)
		{
			savedState.disData = dist.data;		
			
			if (mode == MASTER_MODE)
			{
			dependency_pkg::stateMsg smsg = savedState;
			pubState.publish(smsg);
			}
			else
				ROS_INFO("ERROR : asked to update distance Order from inher values  while the system is in FOLLOWER Mode.");
		}

		void updateSavedState_follower(const dependency_pkg::stateMsg& smsg)
		{
			if (mode == FOLLOWER_MODE)
				savedState = smsg;
			else
				ROS_INFO("ERROR : asked to update savedState from the other system  while the system is in MASTER Mode.");
		}
};
	
int main(int argc, char **argv)
{
	ros::init(argc, argv, "stateRecoverer");
	stateRecoverer sR;
	ros::Rate r(5); 	// 5 state savings per second

	while (ros::ok())
	{
		ros::spinOnce();
		r.sleep();
	}

}

