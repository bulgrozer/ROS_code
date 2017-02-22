#include "ros/ros.h"
#include "std_msgs/String.h"
#include "dependency_pkg/errorMsg.h"
#include "dependency_pkg/safetyMsg.h"
#include <time.h>


class error
{
	public:
	std::string n_name;
	int id;
	ros::Time time[5];

};

class errorManager
{
	public:
	errorManager()
		{
			// SUBSCRIBER
			ros::NodeHandle ns;
			sub = ns.subscribe("error_topic",1,&errorManager::errorCallback,this);


			// PUBLISHER
			ros::NodeHandle np;    
			pub = np.advertise<dependency_pkg::safetyMsg>("nodeDemand_topic", 1);

			i = 0;
			j = 0;

		}

	private:
	ros::Subscriber sub;
	ros::Publisher pub;
	int i;
	int j;
	bool found;
	error TAB[];
	dependency_pkg::safetyMsg killMsg;

	// CALLBACK
	void errorCallback(const dependency_pkg::errorMsg& err)

	{
		for (i=0; i < sizeof(TAB) ; i++)
			{

			 	if(err.node_name == TAB[i].n_name && err.id == TAB[i].id )
				{
					
					TAB[i].time[j] = err.error_time ;
					j = (j + 1)%5 ;
					if ( (TAB[i].time[j] - TAB[i].time[(j+5)%5]).sec < 1)
					{
						j = 0;
						killMsg.password = 0000 ;
						killMsg.nodeName = err.node_name ;
						killMsg.nodeState = false ;
						pub.publish(killMsg);
						ros::spinOnce();
					}
				}
				else
				{
					found = false;
				}
				if(found == false)
				{
					TAB[i+1].n_name = err.node_name ;
					TAB[i+1].id = err.id;
					TAB[i+1].time[0] = err.error_time;
					
				}
			}	 
	}

};




int main(int argc, char **argv)
{
ros::init(argc, argv, "errorManager");
		errorManager error_manager;
	 
		// %Tag(SPIN)%
		ros::spin();
		// %EndTag(SPIN)%

	//}
	
  return 0;
}
