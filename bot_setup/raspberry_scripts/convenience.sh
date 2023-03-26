function refreshenv() {
    source ~/.bashrc
}

function stagehands() {
    local current_dir=$(pwd)

    # Define colors
    local green='\033[0;32m'
    local yellow='\033[1;33m'
    local red='\033[0;31m'
    local bold='\033[1m'
    local underline='\033[4m'
    local nocolor='\033[0m'

    # Parse subcommand
    case $1 in
        "run")
            cd /home/pi/stagehands/
            /home/pi/stagehands/ros/launch_prod.sh
            exit_code=$?
            echo -e "${green}Docker container exited with code $exit_code.${nocolor}"
            ;;
        "update-repo")
            cd /home/pi/stagehands/
            sudo git fetch origin
            sudo git reset --hard origin/integration
            refreshenv

            if [ $? -eq 0 ]; then
                echo -e "${green}Stagehands repository has been updated successfully.${nocolor}"
            else
                echo -e "${red}An error occurred while updating Stagehands repository.${nocolor}"
                echo -e "${yellow}Please check your internet connection and try again.${nocolor}"
            fi
            ;;
        "docker-pull")
            sudo docker pull shiukaheng/stagehands:prod
            if [ $? -eq 0 ]; then
                echo -e "${green}Docker image has been updated successfully.${nocolor}"
            else
                echo -e "${red}An error occurred while updating Docker image.${nocolor}"
                echo -e "${yellow}Please check your internet connection and try again.${nocolor}"
            fi
            ;;
        "docker-restart")
            sudo docker container kill stagehands-dev
            sudo systemctl start stagehands.service
            echo -e "${green}Stagehands service has been restarted.${nocolor}"
            ;;
        "update")
            echo -e "${green}Stopping Stagehands service...${nocolor}"
            sudo docker container kill stagehands-dev
            echo -e "${green}Updating Stagehands repository...${nocolor}"
            stagehands update-repo
            echo -e "${green}Restarting Stagehands service...${nocolor}"
            sudo systemctl start stagehands.service
            echo -e "${green}Stagehands has been updated successfully.${nocolor}"
            ;;
        "ssh")
            echo -e "${green}Connecting to Stagehands...${nocolor}"
            sshpass -p turtlebot ssh root@localhost -p 2222
            echo -e "${green}Disconnected from Stagehands.${nocolor}"
        "help"|"")
            echo -e "${bold}Usage: ${underline}stagehands${nocolor} [subcommand]"
            echo ""
            echo -e "${bold}Subcommands:${nocolor}"
            echo -e "${green}  run              ${nocolor}Run the 'prod-bot' script using /home/pi/stagehands/ros/launch_prod.sh"
            echo -e "${yellow}  update-repo  ${nocolor}Update the Stagehands repository using git fetch and git reset"
            echo -e "${yellow}  docker-pull  ${nocolor}Update the Stagehands Docker image"
            echo -e "${green}  docker-restart ${nocolor}Restart the Stagehands service by stopping and starting it again"
            echo -e "${green}  update          ${nocolor}Update the Stagehands repository and restart the service"
            echo -e "${green}  ssh             ${nocolor}Connect to Stagehands using SSH"
            echo -e "${green}  help             ${nocolor}Display this help message"
            ;;
        *)
            echo -e "${red}Error: Invalid subcommand. Use '${underline}stagehands help${nocolor}' for usage instructions.${nocolor}"
            return 1
            ;;
    esac

    cd "$current_dir"
}
