#ifndef _COMMANDE_ROUES_PLUGIN_HH_
#define _COMMANDE_ROUES_PLUGIN_HH_

#include <gazebo/gazebo.hh>
#include <gazebo/physics/physics.hh>
#include <gazebo/common/common.hh>
#include <gazebo/common/Plugin.hh>
#include <gazebo/common/Event.hh>
#include <gazebo/common/Events.hh>

#include <thread>
#include "ros/ros.h"
#include "ros/callback_queue.h"
#include "ros/subscribe_options.h"
#include "std_msgs/Float64.h"
#include <hector_gazebo_plugins/update_timer.h>




namespace gazebo
{
  /// \brief A plugin to control wheels.
  class CommandeRouesMasterPlugin : public ModelPlugin
  {
    /// \brief Constructor
    public: CommandeRouesMasterPlugin() {}

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

      // Default to zero velocity
      double velocity = 0;

      // Check that the velocity element exists, then read the value
      if (_sdf->HasElement("velocity"))
        velocity = _sdf->Get<double>("velocity");

			//this->joint_right_wheel->SetVelocity(0,velocity);
		  //this->joint_left_wheel->SetVelocity(0,velocity);


      // Create the node
      this->node = transport::NodePtr(new transport::Node());

      this->node->Init(this->model->GetWorld()->GetName());
      
      // Create a topic name
      std::string topicName = "/" + this->model->GetName() + "/velocity_cmd";

			std::cerr << "\nThe wheel command master plugin is attach to model[" <<
        _model->GetName() << "]\n";

      // Subscribe to the topic, and register a callback
      this->sub = this->node->Subscribe(topicName,
         &CommandeRouesMasterPlugin::OnMsg, this);

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
						topicName,
						1,
						boost::bind(&CommandeRouesMasterPlugin::OnRosMsg, this, _1),
						ros::VoidPtr(), &this->rosQueue);
			this->rosSub = this->rosNode->subscribe(so);

			// Spin up the queue helper thread.
			this->rosQueueThread =
				std::thread(std::bind(&CommandeRouesMasterPlugin::QueueThread, this));

			Reset();
			// connect speed profile function
  		std::string worldName = model->GetWorld()->GetName();
  		world = physics::get_world(worldName);
			updateTimer.setUpdateRate(10.0);
			updateTimer.Load(world, _sdf);
			updateConnection = updateTimer.Connect(boost::bind(&CommandeRouesMasterPlugin::profile, this));
    }


		public: void Reset()
		{
			updateTimer.Reset();
		}


// Creation of the speed profile for the master car

		public: void profile()
		{
			std_msgs::Float64 msg;

			double time_init = 0;
			double time = this->model->GetWorld()->GetSimTime().Double();
			double speed = 0;
			//std::cout << "Time init : " << time_init << std::endl;
			//std::cout << "Time : " << time << std::endl;

			//while((time >= time_init) && (time < (time_init + 50)))
			//{
				///Speed reference


				if (time < (time_init + 5))
				{
						speed = 0;
				}else if (time < (time_init +10))
				{
						speed = time/5 - 1;
				}else if (time < (time_init +15))
				{
						speed = 1;
				}else if (time < (time_init +20))
				{
						speed = time/5 -2;
				}else if (time < (time_init +25))
				{
						speed = 2;
				}else if (time < (time_init +30))
				{
						speed = (-1)*time/5 +7;
				}else if (time < (time_init +35))
				{
						speed = 1;
				}else if (time < (time_init +40))
				{
						speed = (-1)*time/5 +8;
				}else
				{
						speed = 0;		
				}

				msg.data = speed;

				this->model->SetLinearVel(math::Vector3(msg.data, 0, 0));

				time = this->model->GetWorld()->GetSimTime().Double();
			//}
		}
		

		/// \brief Handle an incoming message from ROS
		/// \param[in] _msg A float value that is used to set the velocity
		public: void OnRosMsg(const std_msgs::Float64ConstPtr &_msg)
		{
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

		/// \brief A node use for ROS transport
		private: std::unique_ptr<ros::NodeHandle> rosNode;

		/// \brief A ROS subscriber
		private: ros::Subscriber rosSub;

		/// \brief A ROS callbackqueue that helps process messages
		private: ros::CallbackQueue rosQueue;

		/// \brief A thread the keeps running the rosQueue
		private: std::thread rosQueueThread;


		private: UpdateTimer updateTimer;
  	private: event::ConnectionPtr updateConnection;

		private: physics::WorldPtr world;


  };

  // Tell Gazebo about this plugin, so that Gazebo can call Load on this plugin.
  GZ_REGISTER_MODEL_PLUGIN(CommandeRouesMasterPlugin)
}
#endif
