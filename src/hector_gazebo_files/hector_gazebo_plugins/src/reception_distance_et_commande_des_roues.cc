#include <gazebo/gazebo_config.h>
#include <gazebo/transport/transport.hh>
#include <gazebo/msgs/msgs.hh>

// Gazebo's API has changed between major releases. These changes are
// accounted for with #if..#endif blocks in this file.
#include <gazebo/gazebo_client.hh>


/////////////////////////////////////////////////
int main(int _argc, char **_argv)
{
  // Load gazebo as a client
  gazebo::client::setup(_argc, _argv);

  // Create our node for communication
  gazebo::transport::NodePtr node(new gazebo::transport::Node());
  node->Init();

  //	Reception de la distance avec la voiture de devant //

			// Create the node
      this->node = transport::NodePtr(new transport::Node());

      this->node->Init(this->model->GetWorld()->GetName());

			// Topic name
      std::string topicName = "/" + this->model->GetName() + "/sonar";
			


	//	Reception de la vitesse de la voiture //








	// Calcul de la commande de vitesse a envoyer //








	//	Envoi de la commande en vitesse //

	// Publish to the wheel topic
  gazebo::transport::PublisherPtr pub =
    node->Advertise<gazebo::msgs::Vector3d>("/car_model/velocity_cmd");

  // Wait for a subscriber to connect to this publisher
  pub->WaitForConnection();

  // Create a a vector3 message
  gazebo::msgs::Vector3d msg;

  // Set the velocity in the x-component
  gazebo::msgs::Set(&msg, ignition::math::Vector3d(0, 0, std::atof(_argv[1])));


  // Send the message
  pub->Publish(msg);





  // Make sure to shut everything down.
  gazebo::client::shutdown();
}
