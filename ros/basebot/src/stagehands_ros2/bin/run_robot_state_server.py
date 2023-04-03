#! /usr/bin/env python
from stagehands_ros2.robot_state_server import RobotStateServer

server = RobotStateServer()
server.start()

# Publishes on 'stagehands_feedback_state'
# Subscribes to 'stagehands_command_state'