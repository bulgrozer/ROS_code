// %Tag(FULLTEXT)%
#include "ros/ros.h"
#include "std_msgs/String.h"
#include <std_msgs/Float64.h>
#include "sensors/velOrder.h"


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
			pub = np.advertise<std_msgs::Float64>("velCmd_topic", 1);
				
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

	    velCmd.data =  cmd.data ;

		// %Tag(PUBLISH)%
	    	   pub.publish(velCmd);
		// %EndTag(PUBLISH)%

		 ROS_INFO("j'ai ecrit : [%f]", velCmd.data );

		// %Tag(SPINONCE)%
		    ros::spinOnce();
		// %EndTag(SPINONCE)%
	}
	// %EndTag(CALLBACK)%
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

