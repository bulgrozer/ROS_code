// %Tag(FULLTEXT)%
#include "ros/ros.h"
#include <std_msgs/Int64.h>
#include <std_msgs/Float64.h>
#include <std_msgs/Bool.h>
#include "sensors/velOrder.h"

//#include <gazebo_msgs/ApplyJointEffort.h>


class cmdManagerClass
{
	public:
	cmdManagerClass()
		{
			// SUBSCRIBER
			sub = ns.subscribe("/velOrder_topic",1,&cmdManagerClass::cmdCallback1,this);
			sub_mode = ns_mode.subscribe("/redundancyMode_topic",1,&cmdManagerClass::cmdCallback2,this);

			// PUBLISHERS
			pub_cmd = npc.advertise<std_msgs::Float64>("/velCmd_topic", 1);
			pub_enable = npe.advertise<std_msgs::Bool>("/pid_enable",1);
			pub_enable_backup = npeb.advertise<std_msgs::Bool>("/pid_enable_backup",1);

			current_priority.data = 0;

			std_msgs::Bool pid_enable_backup;
			pid_enable_backup.data = true;
			pub_enable_backup.publish(pid_enable_backup); // Enable backup from the start

			//mode = true;			// depending on which raspberry it is launched
		}

	private:

	ros::Subscriber sub;
	ros::Subscriber sub_mode;
	ros::Publisher pub_cmd;
	ros::Publisher pub_enable;
	ros::Publisher pub_enable_backup;
	ros::NodeHandle ns;    /*handle for the subscriber*/	
 	ros::NodeHandle ns_mode;    /*handle for the subscriber*/		
	ros::NodeHandle npc;    //handle for the publisher command
	ros::NodeHandle npe;    //handle for the publisher command
	ros::NodeHandle npeb; // handle for backup publisher

	std_msgs::Int64 current_priority;

	bool mode;						// true = primary ; false = back up

	// %Tag(CALLBACK)%
	void cmdCallback1(const sensors::velOrder& cmd)   
	{
		
		if (mode == true)
		{
	
			std_msgs::Float64 velCmd;

			if(cmd.priority >= current_priority.data)
			{
				if(cmd.release == true)
				{
					current_priority.data = 1;
					std_msgs::Bool pid_enable;
					pid_enable.data = true;
					pub_enable.publish(pid_enable);
					ros::spinOnce();
				}	// end if
				else
				{
					velCmd.data = -cmd.data;
					current_priority.data = cmd.priority;

					pub_cmd.publish(velCmd);
				  ros::spinOnce();

					if(cmd.priority > 1) // Primary PID
					{
						std_msgs::Bool pid_enable;
						pid_enable.data = false;
						pub_enable.publish(pid_enable);
					} // end if

					if(cmd.priority > 0) // Backup PID
					{
						std_msgs::Bool pid_enable_backup;
						pid_enable_backup.data = false;
						pub_enable_backup.publish(pid_enable_backup);
					}  // end if
				}  // end if Release
			}	// end if cmd priority
			else
			{
			 	ROS_INFO("There is a superior priority");
			}

			 ros::spinOnce();
		}  // end if mode

		else{
			// Nothing happens in back up mode !
			ROS_INFO("I am in Back_up mode, nothing happens.. Waiting for the master to crash..");
			ros::spinOnce();
			}

	}	// end function

// %Tag(CALLBACK2)%
	void cmdCallback2(const std_msgs::Bool& cmd)   
	{
			mode = cmd.data; 
	}

};


int main(int argc, char **argv)
{

		ros::init(argc, argv, "cmdManagerClass");
		cmdManagerClass cmd_manager;
	 
		// %Tag(SPIN)%
		ros::spin();
		// %EndTag(SPIN)%

  return 0;
}
// %EndTag(FULLTEXT)%

