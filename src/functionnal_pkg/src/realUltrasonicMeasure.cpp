#include <stdio.h>
#include <stdlib.h>
//#include <wiringPi.h>
#include "ros/ros.h"
#include <std_msgs/Float64.h>
#include <unistd.h>
#include <fcntl.h>
#include "sensors/velOrder.h"


//*****************************************************************************//
//** Attention !!! Lire README et faire les commandes décrites à l'intérieur **//
//*****************************************************************************//


class realUltrasonicMeasureClass
{
		public: 
		
		realUltrasonicMeasureClass()
		{
			distance=0;

			int i;
			for (i = 0 ; i<10 ; i++)
			{
				BUFFER[i] = 0;
			}
			n = 0;
			j = 0;

			// PUBLISHER
		
			pub = np.advertise<sensors::velOrder>("chassis/velOrder_topic", 1);

			// SUBSCRIBER
			sub = ns.subscribe("distanceOrder_topic",1,&realUltrasonicMeasureClass::cmdCallback,this);

			vel_order.priority = 0;
			vel_order.data = 0;							
			vel_order.release = true;
			pub.publish(vel_order);
		}

		 int sendData()
		{
				/*timer_file = open("/dev/us_service", O_RDWR);
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

				distance = distance/58.8235; // distance in centimeters

*/
				distance = 50 ;
				// BUFFER
				float mean = 400;
				BUFFER[j] = distance;
				int k;
				for(k = 0;k<10;k++)
				{
					mean = mean + BUFFER[k];
				}

				mean = mean / n;

				if (n < 10){n++;}
		
				j++;
				if (j == 10) {j = 0;}
mean = 10;
				//detection of a close object
				if (mean < 100)
				{
					do{
					vel_order.priority = 2;
					vel_order.data = 0;							//emergency brake
					vel_order.release = false;
					pub.publish(vel_order);
					}while(realSpeed < 0.001);
				}

				ros::spinOnce();	
		}

void cmdCallback(const std_msgs::Float64& vel)
{
	realSpeed = vel.data;
}


		private: 

			int timer_file, result;
			float distance;

			ros::Publisher pub;
			ros::Subscriber sub;
			ros::NodeHandle np;    //handle for the publisher
			ros::NodeHandle ns;    //handle for the subscriber

			sensors::velOrder vel_order;
		
			float realSpeed;

			float BUFFER[10];
			int j;	// pointer to the write cell of the buffer.
			int n;	// actual buffer size fulfilled with values.

};


int main(int argc, char **argv)
{
 

	//ros::Rate r(10);		// 10 Hz

	//while (ros::ok())
	//{

		ros::init(argc, argv, "realUltrasonicMeasureClass");
		realUltrasonicMeasureClass realUltrasonic;
		sleep(6);
		realUltrasonic.sendData();
	




		// %Tag(SPIN)%
		ros::spin();
		// %EndTag(SPIN)%
	
	//}


  return 0;
}





