# Update apt-get
echo -e "\e[1;32mUpdating apt-get...\e[0m"
sudo sed -i 's/archive.ubuntu.com/uk.archive.ubuntu.com/g' /etc/apt/sources.list
sudo apt-get update

# Make sure curl is installed
echo -e "\e[1;32mInstalling curl...\e[0m"
sudo apt-get install -y curl

# Install nvm, then node and npm (install npm@6 for performance)
echo -e "\e[1;32mInstalling nvm...\e[0m"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
echo -e "\e[1;32mInstalling node and npm...\e[0m"
. ~/.nvm/nvm.sh && nvm install node && nvm alias default node && npm install -g npm@6

# Install docker
echo -e "\e[1;32mInstalling docker...\e[0m"
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install docker-compose
echo -e "\e[1;32mInstalling docker-compose...\e[0m"
sudo apt-get install -y docker-compose

# Clone stagehands into ~/stagehands
echo -e "\e[1;32mCloning stagehands...\e[0m"
cd ~
git clone https://github.com/shiukaheng/stagehands.git

# Install sshpass
echo -e "\e[1;32mInstalling sshpass...\e[0m"
sudo apt-get install -y sshpass

# Add sourcing /scripts/bot_setup/raspberry_scripts/convenience.sh to .bashrc if it hasn't been added already
if ! grep -q "source /home/pi/stagehands/bot_setup/raspberry_scripts/convenience.sh" ~/.bashrc ; then
    echo -e "\e[1;32mAdding sourcing convenience.sh to .bashrc...\e[0m"
    echo "source /home/pi/stagehands/bot_setup/raspberry_scripts/convenience.sh" >> ~/.bashrc
fi

# Install ntp
echo -e "\e[1;32mInstalling ntp...\e[0m"
sudo apt-get install -y ntp

# Sync time
echo -e "\e[1;32mSynching time...\e[0m"
sudo ntpdate -s time.nist.gov

# Create the udev rules directory if it doesn't exist
sudo mkdir -p /etc/udev/rules.d/

# Create the file with the desired content
sudo sh -c 'echo "SUBSYSTEM==\"vchiq\",MODE=\"0666\"" > /etc/udev/rules.d/99-camera.rules'

# Reload the udev rules to apply the changes
sudo udevadm control --reload-rules

# Copy the service file to /etc/systemd/system
echo -e "\e[1;32mCopying service file to /etc/systemd/system...\e[0m"
cd ~/stagehands/bot_setup/raspberry_scripts
sudo cp stagehands.service /etc/systemd/system/stagehands.service

sudo systemctl daemon-reload
sudo systemctl enable stagehands.service

echo -e "\e[1;32mDone!\e[0m"