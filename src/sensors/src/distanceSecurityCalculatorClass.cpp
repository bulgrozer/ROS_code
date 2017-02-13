// %Tag(FULLTEXT)%
#include "ros/ros.h"
#include "std_msgs/String.h"
#include "sensor_msgs/LaserScan.h"
#include <std_msgs/Int8.h>
#include <std_msgs/Float64.h>
#include <geometry_msgs/Twist.h>
#include <gazebo_msgs/LinkStates.h>



class distanceSecurityClass
{
	public:
	distanceSecurityClass()
		{
			// SUBSCRIBER)
			ros::NodeHandle ns;    /*handle for the subscriber*/	 
			sub = ns.subscribe("/gazebo/link_states",1,&distanceSecurityClass::sensorCallback,this);

			// PUBLISHER
			ros::NodeHandle np;    //handle for the publisher
			pub = np.advertise<std_msgs::Float64>("distanceOrder_topic", 1);
				
		}

	private:
	ros::Subscriber sub;
	ros::Publisher pub;

	// %Tag(CALLBACK)%
	void sensorCallback(const gazebo_msgs::LinkStates::ConstPtr& vel)   
	{
	
	  	
		ROS_INFO("velocity x: [%f]", vel->twist[1].linear.x);
		ROS_INFO("velocity y: [%f]", vel->twist[1].linear.y);

		// compute of distance setpoints
		  std_msgs::Float64 d_setpoint;

	     	   d_setpoint.data =  5 ;

		// %Tag(PUBLISH)%
	    	   pub.publish(d_setpoint);
		// %EndTag(PUBLISH)%

		 ROS_INFO("j'ai ecrit : [%f]", d_setpoint );

		// %Tag(SPINONCE)%
		    ros::spinOnce();
		// %EndTag(SPINONCE)%
	}
	// %EndTag(CALLBACK)%
};


int main(int argc, char **argv)
{
  
  ros::init(argc, argv, "distanceSecurityCalculator");
  distanceSecurityClass distanceSetPoint;
 
// %Tag(SPIN)%
  ros::spin();
// %EndTag(SPIN)%


	
  return 0;
}
// %EndTag(FULLTEXT)%

