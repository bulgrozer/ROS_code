#include <ros/ros.h>
#include <string>

#include "std_msgs/Header.h"
#include "dependency_pkg/safetyMsg.h"

#ifndef WATCHDOG_HPP
#define WATCHDOG_HPP

namespace dependency_pkg
{

class Watchdog
{
  public:
    /**
     * @brief Constructor of watchdog object.
     * @details Timeout value must be specified through parameter 'node/watchdog_name/timeout'
     * 
     * @param name Name of the watchdog timer
     * @param timeout Timeout in seconds before callback is called, if no reset is called.
     * @param callback Callback function to be called when timeout expires.
     * @param oneshot Specify whether the callback is called once or continually.
     * @param autostart Specify whether the watchdog timer has to start at creation.
     */
    Watchdog( std::string name, boost::function<void()> callback, bool oneshot = true, bool autostart  = false );
    /**
     * @brief Constructor of watchdog object.
     * @details Timeout value must be specified through constructor parameter.
     * 
     * @param name Name of the watchdog timer
     * @param timeout Timeout in seconds before callback is called, if no reset is called.
     * @param callback Callback function to be called when timeout expires.
     * @param oneshot Specify whether the callback is called once or continually.
     * @param autostart Specify whether the watchdog timer has to start at creation.
     */
    Watchdog( std::string name, double timeout, boost::function<void()> callback, bool oneshot = true, bool autostart  = false );
    ~Watchdog();
    /**
     * Reset the watchdog. Checks the timestamp of the message for which the reset is done. If not too old cancels 
     * all pending callbacks and lets the timer forget about the time that has already elapsed.
     */
    bool reset( const std_msgs::Header& header );

    /**
     * Start the watchdog and its timer. Does nothing if the watchdog is already started. 
     */
    void start();

    /**
     * Stop the watchdog and its timer. Does nothing if the watchdog is already stopped. 
     */
    void stop();

    /**
     * Returns if the timer is running at the moment.
     * @return The timer is running.
     */
    bool is_running();

  private:
     /**
     * Reset the watchdog. Cancels all pending callbacks and lets the timer forget about the time that has already elapsed.
     */
    void reset();
    

    void CB_timer_event( const ros::TimerEvent& event );

    std::string         name_;
    ros::NodeHandle     n_;
    ros::Publisher      pub_error;
    ros::Publisher      pub_arduino;
    bool                autostart_;
    bool                oneshot_;
    bool                running_;
    ros::Timer          timer_;
    double              timeout_;
    dependency_pkg::safetyMsg safety_msg;

    boost::function<void()>  callback_;
};

}

#endif // WATCHDOG_HPP
