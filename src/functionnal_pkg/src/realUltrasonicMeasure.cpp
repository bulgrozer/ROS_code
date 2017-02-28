#include <stdio.h>
#include <stdlib.h>
//#include <wiringPi.h>
#include "ros/ros.h"
#include <std_msgs/Float64.h>
#include <unistd.h>
#include <fcntl.h>
#include "functionnal_pkg/velOrder.h"

#define UPDATE_RATE 1000


//*****************************************************************************//
//** Attention !!! Lire README et faire les commandes décrites à l'intérieur **//
//*****************************************************************************//


class realUltrasonicMeasureClass
{
		public: 
		
		realUltrasonicMeasureClass()
		{
			distance=0;

			//counter = 0;

			int i;
			for (i = 0 ; i<10 ; i++)
			{
				BUFFER[i] = 0;
			}
			n = 0;
			j = 0;

			// PUBLISHER
		
			pub = np.advertise<functionnal_pkg::velOrder>("chassis/velOrder_topic", 1);

			// SUBSCRIBER
			sub = ns.subscribe("distanceOrder_topic",1,&realUltrasonicMeasureClass::cmdCallback,this);

			vel_order.priority = 0;
			vel_order.data = 0;							
			vel_order.release = true;
			pub.publish(vel_order);
		}

		 int sendData()
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

				distance = distance/58.8235; // distance in centimeters



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

			// Test emergency brake !
			/*if (counter > 5000)
			{
				mean = 10;
			}
			else
			{
				mean = 400;
				counter++;
	std::cout << "Compteur : " << counter << std::endl; 
			}*/


				//detection of a close object
				if (mean < 100)
				{
					vel_order.priority = 2;
					vel_order.data = 0;							//emergency brake
					vel_order.release = false;
					pub.publish(vel_order);
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

			functionnal_pkg::velOrder vel_order;
		
			float realSpeed;

			float BUFFER[10];
			int j;	// pointer to the write cell of the buffer.
			int n;	// actual buffer size fulfilled with values.
			//int counter;

};


int main(int argc, char **argv)
{
 	ros::init(argc, argv, "realUltrasonicMeasureClass");
	realUltrasonicMeasureClass realUltrasonic;

	ros::Rate r(UPDATE_RATE);		// in Hz

	while (ros::ok())
	{

		realUltrasonic.sendData();
	
		// %Tag(SPIN)%
		ros::spinOnce();
		// %EndTag(SPIN)%
		r.sleep();

	}


  return 0;
}





