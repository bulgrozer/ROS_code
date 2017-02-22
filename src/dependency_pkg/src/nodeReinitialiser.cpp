#include "ros/ros.h"
#include <stdio.h>      /* printf */
#include <stdlib.h>     /* system commands */
#include <string.h>
#include <iostream>

#include "dependency_pkg/safetyMsg.h"
#include "std_msgs/Bool.h"

using namespace std;


class nodeInitialiser
{
	public :

		nodeInitialiser()
		{
			subKnode = nsKnode.subscribe("/nodeDemand_topic",1000,&nodeInitialiser::killCallBack,this);
			pubWmode = npWmode.advertise<std_msgs::Bool>("/redundancyMode_topic",1);
		}

	private :
		ros::NodeHandle nsKnode, npWmode;
		ros::Subscriber subKnode;
		ros::Publisher pubWmode;
		void killCallBack(const dependency_pkg::safetyMsg& nodeMsg)	
		{
			if (nodeMsg.nodeState == 0 && nodeMsg.password == 0) 
			{
				std_msgs::Bool ans;
				ans.data = false;
				pubWmode.publish(ans);	// Ask to pass as Secondary system.
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

