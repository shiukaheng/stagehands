function stagehands() {
    local current_dir=$(pwd)

    # Parse subcommand
    case $1 in
        "run")
            cd /home/pi/stagehands/
            npm run prod-bot
            ;;
        "update")
            cd /home/pi/stagehands/
            git fetch
            local changes=$(git diff --name-only HEAD origin/main)

            if [ -n "$changes" ]; then
                echo "There are changes in the remote repository that have not been merged yet."
                read -p "Do you want to overwrite your local changes? (y/n) " -n 1 -r
                echo
                if [[ $REPLY =~ ^[Yy]$ ]]; then
                    git reset --hard origin/main
                else
                    echo "Please commit and push your changes before updating."
                fi
            else
                git pull
                sudo npm run ros-pull-prod
            fi
            ;;
        "help"|"")
            echo "Usage: stagehands [subcommand]"
            echo ""
            echo "Subcommands:"
            echo "  run     Run the 'prod-bot' script using npm"
            echo "  update  Update the Stagehands repository using git pull"
            echo "  help    Display this help message"
            ;;
        *)
            echo "Error: Invalid subcommand. Use 'stagehands help' for usage instructions."
            return 1
            ;;
    esac

    cd "$current_dir"
}
