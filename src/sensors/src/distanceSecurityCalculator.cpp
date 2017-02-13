// %Tag(FULLTEXT)%
#include "ros/ros.h"
#include "std_msgs/String.h"
#include "sensor_msgs/LaserScan.h"
#include <std_msgs/Int8.h>
#include <std_msgs/Float64.h>
#include <geometry_msgs/Twist.h>
#include <gazebo_msgs/LinkStates.h>

ros::Publisher sonar_pub;

/**
 * 
 */
// %Tag(CALLBACK)%
void sensorCallback(const gazebo_msgs::LinkStates::ConstPtr& vel)   
{
	
  	
	ROS_INFO("velocity x: [%f]", vel->twist[1].linear.x);
	ROS_INFO("velocity y: [%f]", vel->twist[1].linear.y);

	// compute of distance setpoints
	  std_msgs::Float64 d_setpoint;

     	   d_setpoint.data =  5 ;

	// %Tag(PUBLISH)%
    	   sonar_pub.publish(d_setpoint);
	// %EndTag(PUBLISH)%

         ROS_INFO("j'ai ecrit : [%f]", d_setpoint );

	// %Tag(SPINONCE)%
	    ros::spinOnce();
	// %EndTag(SPINONCE)%


	
}
// %EndTag(CALLBACK)%




int main(int argc, char **argv)
{
  
  ros::init(argc, argv, "distanceSecurityCalculator");

 
  ros::NodeHandle ns;    /*handle for the subscriber*/	 
 
  // %Tag(SUBSCRIBER)%
  ros::Subscriber sonar_sub = ns.subscribe("/gazebo/link_states",1,sensorCallback);
  // %EndTag(SUBSCRIBER)%
	// PUBLISHER
	ros::NodeHandle np;    //handle for the publisher

	// %Tag(PUBLISHER)%
 	 sonar_pub = np.advertise<std_msgs::Float64>("distanceOrder_topic", 1);
	// %EndTag(PUBLISHER)%


	
 
// %Tag(SPIN)%
  ros::spin();
// %EndTag(SPIN)%


	
  return 0;
}
// %EndTag(FULLTEXT)%

