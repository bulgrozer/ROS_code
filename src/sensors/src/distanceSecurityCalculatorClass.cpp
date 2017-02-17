// %Tag(FULLTEXT)%
#include "std_msgs/String.h"
#include "sensor_msgs/LaserScan.h"
#include <std_msgs/Int8.h>
#include <std_msgs/Float64.h>
#include <std_msgs/String.h>
#include <geometry_msgs/Twist.h>
#include <gazebo_msgs/LinkStates.h>
#include <iostream>
#include "ros/callback_queue.h"
#include "ros/ros.h"
#include "ros/time.h"
#include "ros/rate.h"
#include "sensors/errorMessage.h"



class distanceSecurityCalculatorClass
{
	public:
	distanceSecurityCalculatorClass()
		{
			// SUBSCRIBER)
			ros::NodeHandle ns;    /*handle for the subscriber*/	 
			sub = ns.subscribe("/velMeasure_topic",1,&distanceSecurityCalculatorClass::sensorCallback,this);

			// PUBLISHER
			ros::NodeHandle np;    //handle for the publisher
			pub = np.advertise<std_msgs::Float64>("distanceOrder_topic", 1);

			previous_vel = 0;
			dt = 0.01;
			threshold = 10;
				
		}

	private:
	ros::Subscriber sub;
	ros::Publisher pub;
	ros::Publisher pub_error;
	double previous_vel;
	float dt;
	float threshold;

	float BUFFER[10];
	int j, n;  // compteur

	// %Tag(CALLBACK)%
	void sensorCallback(const std_msgs::Float64::ConstPtr& vel)   
	{

		// Temporal redundancy of IMU sensor's data
		float mean = 0;

		if (vel->data - previous_vel > threshold*dt+0.5)
		{	
			ROS_ERROR("Error with the IMU sensor's data");

			sensors::errorMessage error;
			error.error_time = ros::Time::now();
			error.node_name = "distanceSecurityCalculatorClass";
			error.id = 1;

			pub_error.publish(error);

			mean = previous_vel;
		}

		else if (vel->data - previous_vel < (-1)*(threshold*dt+0.5))
		{	
			ROS_ERROR("Error with the IMU sensor's data");

			sensors::errorMessage error;
			error.error_time = ros::Time::now();
			error.node_name = "distanceSecurityCalculatorClass";
			error.id = 1;

			pub_error.publish(error);

			mean = previous_vel;
		}
		else { 

		BUFFER[j] = vel->data;
		j = (j + 1) % 10;
		
		int k,n;
		for(k = 0;k<10;k++)
		{
			mean = mean + BUFFER[k];
		}

		mean = mean / n;

		if (n < 10){n++;}

		previous_vel = mean;
		}
		

		// compute of distance setpoints
		std_msgs::Float64 d_setpoint;
		//std::cout << "Vitesse : " << vel->data << std::endl;
		d_setpoint.data = 2 + (60*mean*3.6 + (mean*3.6) * (mean/3.6))/200 ;

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
	ros::Rate r(100);		// 100 Hz

	while (ros::ok())
	{

		ros::init(argc, argv, "distanceSecurityCalculatorClass");
		distanceSecurityCalculatorClass distanceSetPoint;
	 
		// %Tag(SPIN)%
		ros::spinOnce();
		// %EndTag(SPIN)%
		r.sleep();
	}
	
  return 0;
}
// %EndTag(FULLTEXT)%

