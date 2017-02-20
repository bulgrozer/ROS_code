#include <gazebo/gazebo_config.h>
#include <gazebo/transport/transport.hh>
#include <gazebo/msgs/msgs.hh>

// Gazebo's API has changed between major releases. These changes are
// accounted for with #if..#endif blocks in this file.
#include <gazebo/gazebo_client.hh>


/////////////////////////////////////////////////
int main(int _argc, char **_argv)
{
	std::cout << "Starting application" << std::endl;

	if (_argc == 4)
	{
		std::cout << "Entered 3 speed parameters" << std::endl;
		
		// Load gazebo as a client
		gazebo::client::setup(_argc, _argv);

		// Create our node for communication
		gazebo::transport::NodePtr node(new gazebo::transport::Node());
		node->Init();

		// Publish to the wheel topic
		gazebo::transport::PublisherPtr pub = node->Advertise<gazebo::msgs::Vector3d>("/car_master_model/velocity_master_cmd");

		std::cout << "Waiting for connection" << std::endl;
		// Wait for a subscriber to connect to this publisher. Time out 5 s returns FALSE if no subscriber connected
		if(!(pub->WaitForConnection(5))) std::cout << "No subscriber connected" << std::endl;
		else
		{
			// Create a a vector3 message
			gazebo::msgs::Vector3d msg;

			// Set the velocity in the x-component
			gazebo::msgs::Set(&msg, ignition::math::Vector3d(std::atof(_argv[1]), std::atof(_argv[2]), std::atof(_argv[3])));

			std::cout << "Connected. Sending the speed values " << _argv[1] << " " << _argv[2] << " " << _argv[3] << std::endl;
			// Send the message
			pub->Publish(msg);
		}

		std::cout << "Shuting down the client" << std::endl;
		// Make sure to shut everything down.
		gazebo::client::shutdown();
	}
	else std::cout << "3 arguments needed" << std::endl;

	std::cout << "Ending application" << std::endl;
}
