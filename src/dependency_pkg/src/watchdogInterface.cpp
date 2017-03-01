#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <iostream>
#include <sstream>

#include "wiringPi.h"
#include <string>

#include "ros/ros.h"
#include <std_msgs/Bool.h>


using namespace std;

class watchdogInterface
{

#define UPDATE_RATE 10
#define PIN_ALIVE					0
#define PIN_WANTED_MODE		3
#define PIN_ACTUAL_MODE		2

#define LOW								0
#define HIGH							1


	private :
	ros::Publisher pub;
	ros::Subscriber sub;
	ros::NodeHandle np, ns;

	bool actualMode;

	public :

	watchdogInterface()
	{
		actualMode = 0;	// Follower by default.
		pub = np.advertise<std_msgs::Bool>("redundancyMode_topic",1);
		sub = ns.subscribe("redundancyMode_topic",1, &watchdogInterface::modeCallback, this);

		wiringPiSetup();

		pinMode(PIN_ALIVE,	OUTPUT);
		pinMode(PIN_WANTED_MODE,INPUT);
		pinMode(PIN_ACTUAL_MODE,OUTPUT);
	}

	void alive() 
	{
		digitalWrite(PIN_ALIVE, HIGH);
		// ROS_INFO("I'm alive");
		usleep(50);
		digitalWrite(PIN_ALIVE, LOW);
	}

	void readWantedState()
	{
		bool mode = digitalRead(PIN_WANTED_MODE);
		digitalWrite(PIN_ACTUAL_MODE, mode);
		if (mode != actualMode)
		{
			std_msgs::Bool newMode;
			newMode.data = mode;
			pub.publish(newMode);
			ros::spinOnce();
			actualMode = mode;
		}
	}
// --------------------------

	private :

	void modeCallback(const std_msgs::Bool mode)
	{
		digitalWrite(PIN_ACTUAL_MODE, mode.data);
		ROS_INFO("I want to be in %i mode", mode.data);
	}

};


int main(int argc, char **argv)
{
	ros::init(argc, argv, "watchdogInterface");
	watchdogInterface interface;

	ros::Rate rate(UPDATE_RATE);

	while (ros::ok())
	{
		interface.alive();
		interface.readWantedState();
		ros::spinOnce();
		//rate.sleep();
		//usleep(100);
	}

	return 0;

}
