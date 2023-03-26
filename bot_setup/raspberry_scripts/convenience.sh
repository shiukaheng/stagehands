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
            git fetch origin
            git reset --hard origin/integration
            refreshenv

            if [ $? -eq 0 ]; then
                echo -e "${green}Stagehands repository has been updated successfully.${nocolor}"
            else
                echo -e "${red}An error occurred while updating Stagehands repository.${nocolor}"
                echo -e "${yellow}Please check your internet connection and try again.${nocolor}"
            fi
            ;;
        "pull-docker")
            sudo docker pull shiukaheng/stagehands:prod
            if [ $? -eq 0 ]; then
                echo -e "${green}Docker image has been updated successfully.${nocolor}"
            else
                echo -e "${red}An error occurred while updating Docker image.${nocolor}"
                echo -e "${yellow}Please check your internet connection and try again.${nocolor}"
            fi
            ;;
        "help"|"")
            echo -e "${bold}Usage: ${underline}stagehands${nocolor} [subcommand]"
            echo ""
            echo -e "${bold}Subcommands:${nocolor}"
            echo -e "${green}  run           ${nocolor}Run the 'prod-bot' script using /home/pi/stagehands/ros/launch_prod.sh"
            echo -e "${yellow}  update-repo ${nocolor}Update the Stagehands repository using git fetch and git reset"
            echo -e "${yellow}  pull-docker ${nocolor}Update the Stagehands Docker image"
            echo -e "${green}  help          ${nocolor}Display this help message"
            ;;
        *)
            echo -e "${red}Error: Invalid subcommand. Use '${underline}stagehands help${nocolor}' for usage instructions.${nocolor}"
            return 1
            ;;
    esac

    cd "$current_dir"
}
