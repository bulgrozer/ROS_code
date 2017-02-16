#include "GPIO.h"
#include <stdio.h>
#include <stdlib.h>
//#include <wiringPi.h>
#include "ros/ros.h"
#include <std_msgs/Float64.h>
#include <unistd.h>
#include <fcntl.h>


#define IN  0
#define OUT 1
 
#define LOW  0
#define HIGH 1

//*****************************************************************************//
//** Attention !!! Lire README et faire les commandes décrites à l'intérieur **//
//*****************************************************************************//


class Ultrasonic
{
		public: Ultrasonic() {distance=0;}

		public: int sendData()
		{



				timer_file = open("/dev/us_service", O_RDWR);
				if (timer_file < 0)
				{
				    fputs("open() failed, aborting...\n", stderr);
				    return 1;
				}

				write(timer_file, &distance, sizeof(distance));
				usleep(100000);
				result = read(timer_file, &distance, sizeof(distance));
				    
				if (result != 4)
				{
				    fputs("reading error, aborting...\n", stderr);
				    close(timer_file);
				    return 1;
				}
				//printf("Distance is in cm: %d\n", distance / 58000);
				    
				close(timer_file);

				std_msgs::Float64 distance_msg;

				distance_msg.data = distance/58000; // distance in centimeters

				// PUBLISHER
				ros::NodeHandle np;   
				pub = np.advertise<std_msgs::Float64>("ultrason_topic", 1);
				pub.publish(distance_msg);
				ros::spinOnce();	
		}


		private: 

			int timer_file, result;
			unsigned int distance;
			ros::Publisher pub;	

};


int main(int argc, char **argv)
{
 

	ros::Rate r(10);		// 10 Hz

	while (ros::ok())
	{

		ros::init(argc, argv, "ultrasonic_measure");
		Ultrasonic ultrason;
	 
		// %Tag(SPIN)%
		ros::spinOnce();
		// %EndTag(SPIN)%
	
	}


  return 0;
}





