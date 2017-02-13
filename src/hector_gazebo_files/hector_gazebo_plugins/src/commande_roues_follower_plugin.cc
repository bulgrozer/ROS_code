#ifndef _COMMANDE_ROUES_PLUGIN_HH_
#define _COMMANDE_ROUES_PLUGIN_HH_

#include <gazebo/gazebo.hh>
#include <gazebo/physics/physics.hh>


#include <thread>
#include "ros/ros.h"
#include "ros/callback_queue.h"
#include "ros/subscribe_options.h"
#include "std_msgs/Float64.h"




namespace gazebo
{
  /// \brief A plugin to control wheels.
  class CommandeRouesPlugin : public ModelPlugin
  {
    /// \brief Constructor
    public: CommandeRouesPlugin() {}

    public: virtual void Load(physics::ModelPtr _model, sdf::ElementPtr _sdf)
    {

			// Safety check
      if (_model->GetJointCount() == 0)
      {
        std::cerr << "Invalid joint count, plugin not loaded\n";
        return;
      }

      // Store the model pointer for convenience.
      this->model = _model;

      // Get the first joint.
      this->joint_left_wheel = _model->GetJoint("chassis_to_front_left_wheel");

      //// Get the second joint.
      this->joint_right_wheel = _model->GetJoint("chassis_to_front_right_wheel");


      /*// Setup a P-controller, with a gain of 0.1.
      this->pid = common::PID(1, 0, 0);

      // Apply the P-controller to the first joint.
      this->model->GetJointController()->SetVelocityPID(
          this->joint_left_wheel->GetScopedName(), this->pid);

      // Apply the P-controller to the second joint.
      this->model->GetJointController()->SetVelocityPID(
          this->joint_right_wheel->GetScopedName(), this->pid);*/

      // Default to zero velocity
      double velocity = 0;

      // Check that the velocity element exists, then read the value
      if (_sdf->HasElement("velocity"))
        velocity = _sdf->Get<double>("velocity");

			this->joint_right_wheel->SetVelocity(0,velocity);
			this->joint_left_wheel->SetVelocity(0,velocity);


      // Create the node
      this->node = transport::NodePtr(new transport::Node());

      this->node->Init(this->model->GetWorld()->GetName());
      
      // Create a topic name
      std::string topicName = "/" + this->model->GetName() + "/velocity_cmd";

			std::cerr << "\nThe wheel command plugin is attach to model[" <<
        _model->GetName() << "]\n";

      // Subscribe to the topic, and register a callback
      this->sub = this->node->Subscribe(topicName,
         &CommandeRouesPlugin::OnMsg, this);

			// Initialize ros, if it has not already bee initialized.
			if (!ros::isInitialized())
			{
				int argc = 0;
				char **argv = NULL;
				ros::init(argc, argv, "gazebo_client",
						ros::init_options::NoSigintHandler);
			}

			// Create our ROS node. This acts in a similar manner to
			// the Gazebo node
			this->rosNode.reset(new ros::NodeHandle("gazebo_client"));

			// Create a named topic, and subscribe to it.
			ros::SubscribeOptions so =
				ros::SubscribeOptions::create<std_msgs::Float64>(
						"/" + this->model->GetName() + "/velocity_cmd",
						1,
						boost::bind(&CommandeRouesPlugin::OnRosMsg, this, _1),
						ros::VoidPtr(), &this->rosQueue);
			this->rosSub = this->rosNode->subscribe(so);

			// Spin up the queue helper thread.
			this->rosQueueThread =
				std::thread(std::bind(&CommandeRouesPlugin::QueueThread, this));
    }


    /// \brief Set the velocity of the wheel
    /// \param[in] _vel New target velocity
    /*public: void SetVelocity(const double &_vel)
    {
      // Set the joint's target velocity.
      this->model->GetJointController()->SetVelocityTarget(
          this->joint_left_wheel->GetScopedName(), (-1)*_vel);

			this->model->GetJointController()->SetVelocityTarget(
          this->joint_right_wheel->GetScopedName(), (-1)*_vel);


			// recuperation de la vitesse lineaire du vehicule
			double vel = this->model->GetRelativeLinearVel().x;

			std::cerr << "\nThe speed of the car is equal to :" <<
        vel << "\n";
    }*/



		/// \brief Handle an incoming message from ROS
		/// \param[in] _msg A float value that is used to set the velocity
		public: void OnRosMsg(const std_msgs::Float64ConstPtr &_msg)
		{

			//this->joint_right_wheel->SetVelocity(0,(-1)*_msg->data);
			//this->joint_left_wheel->SetVelocity(0,(-1)*_msg->data);

			this->model->SetLinearVel(math::Vector3(_msg->data, 0, 0));

		}

		/// \brief ROS helper function that processes messages
		private: void QueueThread()
		{
			static const double timeout = 0.01;
			while (this->rosNode->ok())
			{
				this->rosQueue.callAvailable(ros::WallDuration(timeout));
			}
		}




    /// \brief Handle incoming message
    /// \param[in] _msg Repurpose a vector3 message. This function will
    /// only use the x component.
    private: void OnMsg(ConstVector3dPtr &_msg)
    {

		  //this->joint_right_wheel->SetVelocity(0,(-1)*_msg->x());
      //this->joint_left_wheel->SetVelocity(0,(-1)*_msg->x());

			this->model->SetLinearVel(math::Vector3(_msg->x(), 0, 0));

    }

    /// \brief A node used for transport
    private: transport::NodePtr node;

    /// \brief A subscriber to a named topic.
    private: transport::SubscriberPtr sub;

    /// \brief Pointer to the model.
    private: physics::ModelPtr model;

    /// \brief Pointer to the first joint.
    private: physics::JointPtr joint_left_wheel;

    /// \brief Pointer to the second joint.
    private: physics::JointPtr joint_right_wheel;
    private: physics::JointPtr joint_chassis;

    /// \brief A PID controller for the joint.
    private: common::PID pid;


		/// \brief A node use for ROS transport
		private: std::unique_ptr<ros::NodeHandle> rosNode;

		/// \brief A ROS subscriber
		private: ros::Subscriber rosSub;

		/// \brief A ROS callbackqueue that helps process messages
		private: ros::CallbackQueue rosQueue;

		/// \brief A thread the keeps running the rosQueue
		private: std::thread rosQueueThread;

  };

  // Tell Gazebo about this plugin, so that Gazebo can call Load on this plugin.
  GZ_REGISTER_MODEL_PLUGIN(CommandeRouesPlugin)
}
#endif
