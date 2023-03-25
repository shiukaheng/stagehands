# Prompt user for installation type

echo "Do you want to install locally or remotely?"
select option in "Locally" "Remotely"; do
    case $option in
        Locally)
            echo "Starting local installation..."
            local_install=true
            break
            ;;
        Remotely)
            echo "Starting remote installation..."
            local_install=false
            read -p "Enter the user@hostname of the bot you want to install on (e.g. pi@ralts.local): " hostname
            break
            ;;
        *)
            echo "Invalid option. Please select 1 or 2."
            ;;
    esac
done

if [ "$local_install" = true ]; then
    # Run local installation
    bash raspberry_scripts/setup.sh
else
    # Copy setup script to remote host and run it
    echo "Copying setup script to $hostname..."
    scp -r raspberry_scripts/setup.sh "$hostname":/home/pi/setup.sh

    echo "Running setup script on $hostname..."
    ssh "$hostname" "bash /home/pi/setup.sh"

    echo "Done!"
fi