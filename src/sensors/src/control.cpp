#include <ros/ros.h>
#include <gazebo_msgs/ApplyJointEffort.h>
#include <cstdlib>

int main(int argc, char **argv)
{
	ros::init(argc, argv, "control");
	ros::NodeHandle n;
  ros::ServiceClient cmd_pub = n.serviceClient<gazebo_msgs::ApplyJointEffort>("/gazebo/apply_joint_effort");

	ros::Rate loop_rate(1000);
	gazebo_msgs::ApplyJointEffort cmd;

	cmd.request.joint_name = "joint2";
	cmd.request.effort = 10.0;
	cmd.request.duration = ros::Duration(15,0);

	while(ros::ok() ) {
		if (cmd_pub.call(cmd)) {
			ROS_INFO("Applying torque of %f N.m, at joint %s.", cmd.request.effort, cmd.request.joint_name);
		}
		else
		{
			ROS_ERROR("Failed to call service");
			return -1;
		}
		loop_rate.sleep();
	}

	return 0;

}
