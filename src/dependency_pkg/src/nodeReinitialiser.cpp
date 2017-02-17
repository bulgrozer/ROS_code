#include "ros/ros.h"
#include <stdio.h>      /* printf */
#include <stdlib.h>     /* system commands */
#include <string.h>
#include <iostream>

#include "dependency_pkg/safetyMsg.h"

using namespace std;


class nodeInitialiser
{
	public :

		nodeInitialiser()
		{
			sub = ns.subscribe("/nodeDemand_topic",1000,&nodeInitialiser::killCallBack,this);

		}

	private :
		ros::NodeHandle ns;
		ros::Subscriber sub;

		void killCallBack(const dependency_pkg::safetyMsg& nodeMsg)	
		{
			if (nodeMsg.nodeState == 0) 
			{
				string systemCmd = "rosnode kill" + nodeMsg.nodeName;
			  system(systemCmd.c_str());
			}
		}


};


int main(int argc, char **argv)
{
	ros::init(argc, argv, "nodeKiller");
	nodeInitialiser nodeKiller;

	ros::spin();

	return -1;
}

