#include "GPIO.h"
#include <stdio.h>
#include <stdlib.h>
#include <wirinPi.h>
#include "ros/ros.h"
#include <std_msgs/Float64.h>


#define IN  0
#define OUT 1
 
#define LOW  0
#define HIGH 1



class Ultrasonic
{
		public: Ultrasonic() 
		{
				numPinWrite = 2;
				numPinRead = 3;
				GPIOExport(numPinWrite);
				GPIODirection(numPinWrite,OUT);
				 	
				GPIOExport(numPinRead);
				GPIODirection(numPinRead,IN);
		}

		public: void dataRequest()
		{
				GPIOWrite(numPinWrite,HIGH);
				usleep(300);
				GPIOWrite(numPinWrite,LOW);
				usleep(100);
		}

		public: void getData()
		{
				std_msgs::Float64 distance_msg;
				distance_msg.data = 17150 * GPIORead(numPinWrite);

		// PUBLISHER
			ros::NodeHandle np;   
			pub = np.advertise<std_msgs::Float64>("ultrason_topic", 1);
		  pub.publish(distance_msg);
		  ros::spinOnce();			
		}

		private: 
			int numPinWrite;
			int numPinRead;
			double distance;
			ros::Publisher pub;	

};


int main(int argc, char **argv)
{
  
  ros::init(argc, argv, "ultrasonic_measure");
  Ultrasonic ultrason;
 
// %Tag(SPIN)%
  ros::spin();
// %EndTag(SPIN)%

  return 0;
}





