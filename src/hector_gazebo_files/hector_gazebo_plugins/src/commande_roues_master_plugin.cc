#ifndef _COMMANDE_ROUES_PLUGIN_HH_
#define _COMMANDE_ROUES_PLUGIN_HH_

#include <gazebo/gazebo.hh>
#include <gazebo/physics/physics.hh>
#include <gazebo/common/common.hh>
#include <gazebo/common/Plugin.hh>
#include <gazebo/common/Event.hh>
#include <gazebo/common/Events.hh>
#include <gazebo/msgs/msgs.hh>

#include <thread>
#include "ros/ros.h"
#include "ros/callback_queue.h"
#include "ros/subscribe_options.h"
#include "std_msgs/Float64.h"
#include <hector_gazebo_plugins/update_timer.h>

#define TIME_INTERVAL 10.0
#define ACCELERATION_LIMIT 5.0

namespace gazebo
{
	/// \brief A plugin to control wheels.
	class CommandeRouesMasterPlugin : public ModelPlugin
	{
		/// \brief Constructor
		public: CommandeRouesMasterPlugin()
		{
			firstSpeedProfile = true; // "awaiting" first speed profile
			timeInit = 0.0;
			currentTime = 0.0;
			timeElapsed = 0.0;
			previousTime = 0.0;
			deltaTime = 0.0;
			speed = 0.0;
			speedVectorIterator = 0;
		}

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

			// Create the node for Gazebo
			this->node = transport::NodePtr(new transport::Node());
			this->node->Init(this->model->GetWorld()->GetName());
      
			// Create a topic name
			std::string topicName = "/" + this->model->GetName() + "/velocity_master_cmd";
			//std::cerr << "\nThe wheel command master plugin is attach to model[" << _model->GetName() << "]\n";
			//std::cout << "Node initialized in " << this->model->GetWorld()->GetName() << "\nTopic name " << topicName << std::endl; // debug

			// Subscribe to the topic, and register a callback
			this->sub = this->node->Subscribe(topicName, &CommandeRouesMasterPlugin::OnMsg, this);

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
			ros::SubscribeOptions so = ros::SubscribeOptions::create<std_msgs::Float64>(topicName,1,boost::bind(&CommandeRouesMasterPlugin::OnRosMsg, this, _1),ros::VoidPtr(), &this->rosQueue);
			this->rosSub = this->rosNode->subscribe(so);

			// Spin up the queue helper thread.
			this->rosQueueThread = std::thread(std::bind(&CommandeRouesMasterPlugin::QueueThread, this));

			Reset();

			// Prepare the timer
  			std::string worldName = model->GetWorld()->GetName();
  			world = physics::get_world(worldName);
			updateTimer.Load(world, _sdf);
    		}

		public: void Reset()
		{
			updateTimer.Reset();
		}		

		/// \brief Handle an incoming message from ROS
		/// \param[in] _msg A float value that is used to set the velocity
		public: void OnRosMsg(const std_msgs::Float64ConstPtr &_msg)
		{
			this->model->SetLinearVel(math::Vector3(_msg->data, 0, 0));
		}

		/// \brief ROS helper function that processes messages
		public: void QueueThread()
		{
			static const double timeout = 0.01;
			while (this->rosNode->ok())
			{
				this->rosQueue.callAvailable(ros::WallDuration(timeout));
			}
		}
		
		/// \brief Handle incoming message
		/// \param[in] _msg Repurpose a vector3 message.
		private: void OnMsg(ConstVector3dPtr &_msg)
		{
			this->speedVector = ConvertIgn(*_msg); // Convert a msgs::Vector3d to an ignition::math::Vector3d. _msg contains 3 speed values
			timeInit = 0.0; // Set to 0.0 for a new speed profile

			// Connect profile() method to the timer so that it ticks periodically /!\ Only do it ONCE, after we get a first speed profile
			if(firstSpeedProfile)
			{
				firstSpeedProfile = false;
				updateTimer.setUpdateRate(10.0); // 10 Hz i.e. 100 ms
				updateConnection = updateTimer.Connect(boost::bind(&CommandeRouesMasterPlugin::profile, this));
			}
		}

		// Creation of the speed profile for the master car
		private: void profile()
		{
			// Start of the speed profile
			if(timeInit == 0.0)
			{
				timeInit = this->model->GetWorld()->GetSimTime().Double(); // Get initial simulation time in seconds
				speedVectorIterator = 0;
				speed = speedVector[speedVectorIterator]; // Get the first speed value from speedVector
			}

			currentTime = this->model->GetWorld()->GetSimTime().Double(); // Get current simulation time in seconds
			timeElapsed = currentTime - timeInit; // Time elapsed for one specific speed value
			deltaTime = currentTime - previousTime; // Time variation
			previousTime = currentTime; // For the next time this method is called

			// Change speed every TIME_INTERVAL, for all 3 speed values from speedVector
			if(timeElapsed >= TIME_INTERVAL)
			{
				timeInit = this->model->GetWorld()->GetSimTime().Double(); // Get initial simulation time in seconds for the new speed
				speedVectorIterator++;
			}

			std_msgs::Float64 msg; // Message to send, contains a speed value

			// 3 speed values on the profile
			if(speedVectorIterator <= 2)
			{
				// Saturation creation
				speed = speedVector[speedVectorIterator];
				double real_speed = this->model->GetRelativeLinearVel().x; // Get the model's speed
				double deltaSpeed = speed - real_speed; // Speed variation to determine the sign
				// deltaSpeed < 0 -> need to decelerate
				// deltaSpeed >= 0 -> need to accelerate

				if(deltaSpeed < 0) speed = real_speed - ACCELERATION_LIMIT*deltaTime; // Limited to max deceleration
				else speed = real_speed + ACCELERATION_LIMIT*deltaTime; // Limited to max acceleration

				if(((speed > speedVector[speedVectorIterator]) && (deltaSpeed >= 0)) || ((speed < speedVector[speedVectorIterator]) && (deltaSpeed < 0))) speed = speedVector[speedVectorIterator]; // Limit the calculated speed to the one specified in speedVector
				if(speed < 0.0) speed = 0.0; // No negative speed
				msg.data = speed;
			}
			else msg.data = 0.0;

			// Set car speed
			this->model->SetLinearVel(math::Vector3(msg.data, 0, 0));
		}

		/// \brief A node used for transport
		private: transport::NodePtr node;

		/// \brief A subscriber to a named topic.
		private: transport::SubscriberPtr sub;

		/// \brief Pointer to the model.
		private: physics::ModelPtr model;

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

		private: math::Vector3 speedVector;

		private: bool firstSpeedProfile;

		private: double timeInit, currentTime, timeElapsed, previousTime, deltaTime, speed; // Times in seconds, speed in m/s

		private: int speedVectorIterator;
};

	// Tell Gazebo about this plugin, so that Gazebo can call Load on this plugin.
	GZ_REGISTER_MODEL_PLUGIN(CommandeRouesMasterPlugin)
}
#endif
