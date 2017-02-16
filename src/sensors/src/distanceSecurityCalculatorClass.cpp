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
			sub = ns.subscribe("/velMeasure_topic",1,&distanceSecurityClass::sensorCallback,this);

			// PUBLISHER
			ros::NodeHandle np;    //handle for the publisher
			pub = np.advertise<std_msgs::Float64>("distanceOrder_topic", 1);
				
		}

	private:
	ros::Subscriber sub;
	ros::Publisher pub;
	double previous_vel = 0;
	float dt = 0.01;
	float threshold = 10;

	// %Tag(CALLBACK)%
	void sensorCallback(const std_msgs::Float64::ConstPtr& vel)   
	{

		// Temporal redundancy of IMU sensor's data
		
		if (vel->data - previous_vel > threshold*dt+0.5)
		{	
			ROS_ERROR("Error with the IMU sensor's data");
		}

		if (vel->data - previous_vel < (-1)*(threshold*dt+0.5))
		{	
			ROS_ERROR("Error with the IMU sensor's data");
		}

		previous_vel = vel->data;

		// compute of distance setpoints
		std_msgs::Float64 d_setpoint;
		//std::cout << "Vitesse : " << vel->data << std::endl;
		d_setpoint.data = 2 + (60*vel->data*3.6 + (vel->data*3.6) * (vel->data/3.6))/200 ;

		// %Tag(PUBLISH)%
	  pub.publish(d_setpoint);
		// %EndTag(PUBLISH)%

		// %Tag(SPINONCE)%
		ros::spinOnce();
		// %EndTag(SPINONCE)%
	}
	// %EndTag(CALLBACK)%
};


int main(int argc, char **argv)
{
	ros::Rate r(10);		// 10 Hz

	while (ros::ok())
	{

		ros::init(argc, argv, "distanceSecurityCalculator");
		distanceSecurityClass distanceSetPoint;
	 
		// %Tag(SPIN)%
		ros::spinOnce();
		// %EndTag(SPIN)%

	}
	
  return 0;
}
// %EndTag(FULLTEXT)%

