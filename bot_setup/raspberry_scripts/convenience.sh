function stagehands() {
    local current_dir=$(pwd)

    # Define colors
    local green='\033[0;32m'
    local yellow='\033[1;33m'
    local red='\033[0;31m'
    local bold='\033[1m'
    local nocolor='\033[0m'

    # Parse subcommand
    case $1 in
        "run")
            cd /home/pi/stagehands/
            npm run prod-bot
            ;;
        "update")
            cd /home/pi/stagehands/
            git fetch origin
            git reset --hard origin/integration

            if [ $? -eq 0 ]; then
                echo -e "${green}Stagehands has been updated successfully.${nocolor}"
                sudo docker pull shiukaheng/stagehands:prod
                echo -e "${green}Docker image has been updated successfully.${nocolor}"
            else
                echo -e "${red}An error occurred while updating Stagehands.${nocolor}"
                echo -e "${yellow}Please check your internet connection and try again.${nocolor}"
            fi
            ;;
        "help"|"")
            echo -e "${bold}Usage: stagehands [subcommand]${nocolor}"
            echo ""
            echo -e "${bold}Subcommands:${nocolor}"
            echo -e "${bold}  run     ${nocolor}Run the 'prod-bot' script using npm"
            echo -e "${bold}  update  ${nocolor}Update the Stagehands repository using git fetch and git reset, and update Docker image"
            echo -e "${bold}  help    ${nocolor}Display this help message"
            ;;
        *)
            echo -e "${red}Error: Invalid subcommand. Use 'stagehands help' for usage instructions.${nocolor}"
            return 1
            ;;
    esac

    cd "$current_dir"
}