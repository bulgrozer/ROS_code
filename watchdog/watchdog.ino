#include <ros.h>
#include <std_msgs/Bool.h>
#include <Arduino.h>

class watchdog
{
	public:
	watchdog()
		{
			// SUBSCRIBERS
			ros::Subscriber<std_msgs::Bool> sub1("R1_redundancyMode_topic", &callBack1 );
                        ros::Subscriber<std_msgs::Bool> sub2("R2_redundancyMode_topic", &callBack2 );
                        
			// PUBLISHERS
			ros::Publisher pub1("R1_redundancyMode_topic", &raspyState1);
                        ros::Publisher pub2("R2_redundancyMode_topic", &raspyState2);
		}

	private:
        ros::NodeHandle ns1;
        ros::NodeHandle np1;
        ros::NodeHandle ns2;
        ros::NodeHandle np2;
        
        std_msgs::Bool raspyState1 ;
        std_msgs::Bool raspyState2 ;
	
	// %Tag(CALLBACK)%
	void callBack1( const std_msgs::Bool& raspyState1)
        {
          if (raspyState1.data == false)
          {
            raspyState2.data = true;
            pub2.publish( &raspyState2 );
            np2.spinOnce();
            delay(1000);
          }
        }

        // %Tag(CALLBACK)%
	void callBack2( const std_msgs::Bool& raspyState2)
        {
          if (raspyState2.data == false)
          {
            raspyState1.data = true;
            pub1.publish( &raspyState1 );
            np1.spinOnce();
            delay(1000);
           }
        }   
};        


void setup() {
  // put your setup code here, to run once:
  np1.initNode();
  np1.advertise(pub1);
  
  ns1.initNode();
  ns1.subscribe(sub);
  
  np2.initNode();
  np2.advertise(pub2);
  
  ns2.initNode();
  ns2.subscribe(sub);
}

void loop() {
  // put your main code here, to run repeatedly:
  
  watchdog WATCHDOG;
  
  ns1.spinOnce();
  delay(1);
  
  ns2.spinOnce();
  delay(1);
  
}
