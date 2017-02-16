// %Tag(FULLTEXT)%
#include "ros/ros.h"
#include <std_msgs/Int64.h>
#include <std_msgs/Float64.h>
#include <std_msgs/Bool.h>
#include "sensors/velOrder.h"

//#include <gazebo_msgs/ApplyJointEffort.h>


class cmd_managerClass
{
	public:
	cmd_managerClass()
		{
			// SUBSCRIBER
			sub = ns.subscribe("/velOrder_topic",1,&cmd_managerClass::cmdCallback,this);

			// PUBLISHER
			pub_cmd = npc.advertise<std_msgs::Float64>("/velCmd_topic", 1);
			pub_enable = npe.advertise<std_msgs::Bool>("/left_wheel/pid_enable",1);
		// "/velCmd_topic"
			/*
			ros::ServiceClient cmd_pub = np.serviceClient<gazebo_msgs::ApplyJointEffort>("/gazebo/apply_joint_effort");
			*/
			//double lastCmd = 0;
			current_priority.data = 0;
		}

	private:

	ros::Subscriber sub;
	ros::Publisher pub_cmd;
	ros::Publisher pub_enable;
	ros::NodeHandle ns;    /*handle for the subscriber*/	 			
	ros::NodeHandle npc;    //handle for the publisher command
	ros::NodeHandle npe;    //handle for the publisher command

	std_msgs::Int64 current_priority;

	// %Tag(CALLBACK)%
	void cmdCallback(const sensors::velOrder& cmd)   
	{
		std_msgs::Float64 velCmd;
		if(cmd.priority >= current_priority.data)
		{
			if(cmd.release == true)
			{
				current_priority.data = 0;
				std_msgs::Bool pid_enable;
				pid_enable.data = true;
				pub_enable.publish(pid_enable);
			  ros::spinOnce();
			}
			else
			{
				velCmd.data = -cmd.data;
				current_priority.data = cmd.priority;
				pub_cmd.publish(velCmd);
		    ros::spinOnce();

		 		ROS_INFO("j'ai ecrit : [%f]", velCmd.data );
				if(cmd.priority > 1)
				{
					std_msgs::Bool pid_enable;
					pid_enable.data = false;
					pub_enable.publish(pid_enable);
		  	  ros::spinOnce();
				}
			}
		}
		else
		{
	   		 ROS_INFO("There is a superior priority");
		}


			/*
			// Application d'un couple en cumulatif 
			gazebo_msgs::ApplyJointEffort valCmd;
			valCmd.request.joint_name = "chassis_to_front_left_wheel";
			valCmd.request.effort = cmd.data - lastCmd;
			valCmd.request.duration = ros::Duration(-1,0);
			
			cmd_pub.call(valCmd);
			*/


		}	
};


int main(int argc, char **argv)
{
  

	ros::Rate r(10);		// 10 Hz

	while (ros::ok())
	{
	

		ros::init(argc, argv, "cmd_manager");
		cmd_managerClass cmd_manager;
	 
		// %Tag(SPIN)%
		ros::spinOnce();
		// %EndTag(SPIN)%

	}
	
  return 0;
}
// %EndTag(FULLTEXT)%

