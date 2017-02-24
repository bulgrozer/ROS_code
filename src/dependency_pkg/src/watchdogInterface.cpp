#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <iostream>
#include <sstream>

#include "GPIO.h"
#include <string>

#include "ros/ros.h"
#include <std_msgs/Bool.h>


using namespace std;

class watchdogInterface
{

#define UPDATE_RATE 100
#define PIN_ALIVE					1
#define PIN_WANTED_MODE		2
#define PIN_ACTUAL_MODE		3

#define IN								0
#define OUT								1
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

		GPIOExport(PIN_ALIVE);
		GPIOExport(PIN_WANTED_MODE);
		GPIOExport(PIN_ACTUAL_MODE);

		GPIODirection(PIN_ALIVE,			OUT);
		GPIODirection(PIN_WANTED_MODE,IN);
		GPIODirection(PIN_ACTUAL_MODE,OUT);
	}

	void alive() 
	{
		GPIOWrite(PIN_ALIVE, HIGH);
		usleep(50);
		GPIOWrite(PIN_ALIVE, LOW);
	}

	void readWantedState()
	{
		bool mode = GPIORead(PIN_WANTED_MODE);
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
		GPIOWrite(PIN_ACTUAL_MODE, mode.data);
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
		rate.sleep();
	}

	return 0;

}
