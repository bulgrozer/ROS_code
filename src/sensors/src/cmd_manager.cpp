// %Tag(FULLTEXT)%
#include "ros/ros.h"

#include <std_msgs/Float64.h>
#include "sensors/velOrder.h"

//#include <gazebo_msgs/ApplyJointEffort.h>


class cmd_managerClass
{
	public:
	cmd_managerClass()
		{
			// SUBSCRIBER)
			ros::NodeHandle ns;    /*handle for the subscriber*/	 
			sub = ns.subscribe("/velOrder_topic",1,&cmd_managerClass::cmdCallback,this);

			// PUBLISHER
			ros::NodeHandle np;    //handle for the publisher
			pub = np.advertise<std_msgs::Float64>("/car_follower_model/velocity_cmd", 1);
		// "/velCmd_topic"
			/*
			ros::ServiceClient cmd_pub = np.serviceClient<gazebo_msgs::ApplyJointEffort>("/gazebo/apply_joint_effort");
			*/
			double lastCmd = 0;
				
		}

	private:
	
	ros::Subscriber sub;
	ros::Publisher pub;

	// %Tag(CALLBACK)%
	void cmdCallback(const sensors::velOrder& cmd)   
	{
	
	  	
		//ROS_INFO("velocity x: [%f]", vel->twist[1].linear.x);
		//ROS_INFO("velocity y: [%f]", vel->twist[1].linear.y);

		// compute of distance setpoints
		  std_msgs::Float64 velCmd;
	    velCmd.data =  cmd.data;
			
			/*
			// Application d'un couple en cumulatif 
			gazebo_msgs::ApplyJointEffort valCmd;
			valCmd.request.joint_name = "chassis_to_front_left_wheel";
			valCmd.request.effort = cmd.data - lastCmd;
			valCmd.request.duration = ros::Duration(-1,0);
			
			cmd_pub.call(valCmd);
			*/


		// %Tag(PUBLISH)%
	   pub.publish(velCmd);
		 ROS_INFO("j'ai ecrit : [%f]", velCmd.data );

		// %Tag(SPINONCE)%
		    ros::spinOnce();
		}	
};


int main(int argc, char **argv)
{
  
  ros::init(argc, argv, "cmd_manager");
  cmd_managerClass cmd_manager;
 
// %Tag(SPIN)%
  ros::spin();
// %EndTag(SPIN)%


	
  return 0;
}
// %EndTag(FULLTEXT)%

