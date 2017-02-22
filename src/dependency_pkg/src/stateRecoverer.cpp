#include <stdio.h>
#include <unistd.h>			//Used for UART
#include <fcntl.h>			//Used for UART
#include <termios.h>
#include <string>

#include "ros/ros.h"
#include "sensors/velOrder.msg"
#include "dependency_pkg/stateMsg.msg"
#include <std_msgs/Fload64.h>

#define FOLLOWER_MODE		0
#define MASTER_MODE			1
#define UNKNOWN_MODE		-1

using namespace std;

class stateRecoverer
{
	private :
		stateMsg savedState;		
		ros::Subscriber subVel, subOrd, subState, subMod;
		ros::Publisher  pubVel, pubOrd, pubState;
		ros::NodeHandle nsVel, nsOrd, nsMod, nsState, npVel, npOrd, npState;
		int mode;

	public :
		stateRecoverer::stateRecoverer()
		{
			savedState.velPriority = 0;
			savedState.velData = 0;
			savedState.disData = 0;
			savedState.velRelease = 1;
			
			subMod = nsMod.subscribe("/redundancyMode_topic",1,&stateRecoverer::updateMode,this);
			// Master Publishing setup
			pubState = npState.advertise<dependency_pkg::stateMsg>("/state_topic",1);
			// Follower Publishing setup
			pubVel = npVel.advertise<sensors::velOrder>("/velOrder_topic",1);
			pubOrd = npOrd.advertise<std_msgs::Float64>("/distanceOrder_topic",1);

			mode = UNKNOWN_MODE; 	// Waiting to know the mode of the Raspberry Pi.
		}



	private :
		void stateRecoverer::updateMode(const std_msgs::bool& m)
		{
			if (m != this.mode)
			{
				if (m == MASTER_MODE)
				{
					subVel = nsVel.subscribe("/velOrder_topic",1,&stateRecoverer::updateStateVel_master,this);
					subOrd = nsOrd.subscribe("/distanceOrder_topic",1,&stateRecoverer::updateStateOrd_master,this);
					if (this.mode == FOLLOWER_MODE)
					{	// Shutdown : passage de Master a Follower.
						subState.shutdown();
						this.launchMasterMode();
					}

				}
				else if (m == FOLLOWER_MODE)
				{
					subState = nsState.subscribe("/state_topic",1,&stateRecoverer::updateSavedState_follower,this);
					if (this.mode == MASTER_MODE)
					{	// debut du mode degrade.
						subVel.shutdown();
						subOrd.shutdown();
					}
				}
			this.mode = m;
			}
		}

		void stateRecoverer::launchMasterMode()
		{
			velOrder vel;
			vel.Priority = savedState.velPriority;
			vel.data = savedState.velData;
			vel.release = savedState.velRelease;
			pubVel.publish(vel);

			Float64 Ord;
			Ord.data = savedState.disData;
			pubOrd.publish(Ord);
		}

		void stateRecoverer::updateStateVel_master(const sensors::velOrder& vel)
		{
			savedState.velPriority = vel.priority;
			savedState.velDate = vel.data;
			savedState.velRelease = vel.Release;

			if (mode == MASTER_MODE)
			{
			dependency_pkg::stateMsg smsg
			pubState.publish(smsg);
			}
			else
				ROS_INFO("ERROR : asked to update saved velocity order from inher values  while the system is in FOLLOWER Mode.");
		}

		void stateRecoverer::updateStateOrd_master(const std_msgs::Float64& dist)
		{
			savedState.disData = dist;		
			
			if (mode == MASTER_MODE)
			{
			dependency_pkg::stateMsg smsg
			pubState.publish(smsg);
			}
			else
				ROS_INFO("ERROR : asked to update distance Order from inher values  while the system is in FOLLOWER Mode.");
		}

		void stateRecoverer::updateSavedState_follower(const dependency_pkg::stateMsg& smsg)
		{
			if (this.mode == FOLLOWER_MODE)
				this.savedState = smsg;
			else
				ROS_INFO("ERROR : asked to update savedState from the other system  while the system is in MASTER Mode.");
		}
};
	
int main(int argc, char **argv)
{
	ros::Rate r(5); 	// 5 state savings per second.
	ros::init(argc, argv, "stateRecoverer");
	stateRecoverer sR;
	while (ros::ok())
	{
		if (mode == MASTER_MODE)
		{
			dependency_pkg::stateMsg smsg = savedState;
			pubState.publish(smsg);
		}
		ros::spinOnce();
		r.sleep();
	}

}

