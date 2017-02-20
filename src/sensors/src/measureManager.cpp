// %Tag(FULLTEXT)%
#include "ros/ros.h"
#include "std_msgs/String.h"
#include "sensor_msgs/LaserScan.h"
#include <std_msgs/Int8.h>
#include <std_msgs/Float64.h>
#include <geometry_msgs/Twist.h>
#include <gazebo_msgs/LinkStates.h>
#include <dependency_pkg/watchdog.h>

class measureManagerClass
{
	public:
	measureManagerClass()
		{
			// SUBSCRIBER 1
			ros::NodeHandle ns1;    /*handle for the 1st subscriber*/	 
			sub1 = ns1.subscribe("/distanceMesure1_topic",1,&measureManagerClass::measureCallback1,this);

			// SUBSCRIBER 2
			ros::NodeHandle ns2;    /*handle for the 2nd subscriber*/	 
			sub2 = ns2.subscribe("/distanceMesure2_topic",1,&measureManagerClass::measureCallback2,this);

			// SUBSCRIBER 3
			ros::NodeHandle ns3;    /*handle for the 3rd subscriber*/	 
			sub3 = ns3.subscribe("/distanceMesure3_topic",1,&measureManagerClass::measureCallback3,this);

			// PUBLISHER
			ros::NodeHandle np;    //handle for the publisher
			pub = np.advertise<std_msgs::Float64>("distanceCmd_topic", 1);
			
                        Watchdog wd_measureManager ;
                        wd_measureManager.start();
				
		}

	private:
	ros::Subscriber sub1;
	ros::Subscriber sub2;
	ros::Subscriber sub3;
	ros::Publisher pub;
	double d1;
	double d2;
	double d3;
	

	// %Tag(CALLBACK)%
	void measureCallback1(const std_msgs::Float64::ConstPtr& dist1)   
	{
	
		//ROS_INFO("distance 1: [%lf]", dist1->data);
		d1 = dist1->data;
		distanceManager();
		
	}
	// %EndTag(CALLBACK)%

	
	// %Tag(CALLBACK)%
	void measureCallback2(const std_msgs::Float64::ConstPtr& dist2)   
	{
	
	  	
		//ROS_INFO("distance 2: [%lf]", dist2->data);
		d2 = dist2->data;
		distanceManager();
		
	}
	// %EndTag(CALLBACK)%

	
	// %Tag(CALLBACK)%
	void measureCallback3(const std_msgs::Float64::ConstPtr& dist3)   
	{
	
	  //ROS_INFO("distance 3: [%lf]", dist3->data);
		d3 = dist3->data;
		distanceManager();
		
	}
	// %EndTag(CALLBACK)%

	

	void distanceManager(){
			

		double diff_1;
		double diff_2;
		double d_final;

		if ((d1>=d2)&&(d2>=d3))
		{
			diff_1 = d1 - d2;
			diff_2 = d2 - d3;
			if(diff_1 > diff_2)
			{
				d_final = (d2+d3)/2;
			}else
			{
				d_final = (d2+d1)/2;
			}
		}

		if ((d1>=d3)&&(d3>=d2))
		{
			diff_1 = d1 - d3;
			diff_2 = d3 - d2;
			if(diff_1 > diff_2)
			{
				d_final = (d2+d3)/2;
			}else
			{
				d_final = (d1+d3)/2;
			}
		}

		if ((d2>=d1)&&(d1>=d3))
		{
			diff_1 = d2 - d1;
			diff_2 = d1 - d3;
			if(diff_1 > diff_2)
			{
				d_final = (d1+d3)/2;
			}else
			{
				d_final = (d1+d2)/2;
			}
		}

		if ((d2>=d3)&&(d3>=d1))
		{
			diff_1 = d2 - d3;
			diff_2 = d3 - d1;
			if(diff_1 > diff_2)
			{
				d_final = (d1+d3)/2;
			}else
			{
				d_final = (d2+d3)/2;
			}
		}

		if ((d3>=d1)&&(d1>=d2))
		{
			diff_1 = d3 - d1;
			diff_2 = d1 - d2;
			if(diff_1 > diff_2)
			{
				d_final = (d1+d2)/2;
			}else
			{
				d_final = (d1+d3)/2;
			}
		}

		if ((d3>=d2)&&(d2>=d1))
		{
			diff_1 = d3 - d2;
			diff_2 = d2 - d1;
			if(diff_1 > diff_2)
			{
				d_final = (d2+d1)/2;
			}else
			{
				d_final = (d2+d3)/2;
			}
		}

		
		   std_msgs::Float64 d_cmd;

	     d_cmd.data = d_final;

		// %Tag(PUBLISH)%
	    	   pub.publish(d_cmd);
		// %EndTag(PUBLISH)%

		// %Tag(SPINONCE)%
		    ros::spinOnce();
		// %EndTag(SPINONCE)%

		 //ROS_INFO("j'ai ecrit d_cmd : [%lf]", d_cmd);

		
	}
};


int main(int argc, char **argv)
{
  

	//ros::Rate r(10);		// 10 Hz

	//while (ros::ok())
	//{
	
  	ros::init(argc, argv, "Measure_manager");
  	measureManagerClass measure_manager_class;
 
		// %Tag(SPIN)%
  	ros::spin();
		// %EndTag(SPIN)%

	//}

	
  return 0;
}
// %EndTag(FULLTEXT)%

