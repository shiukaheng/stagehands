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

# Add sourcing /scripts/bot_setup/raspberry_scripts/convenience.sh to .bashrc if it hasn't been added already
if ! grep -q "source /home/pi/stagehands/bot_setup/raspberry_scripts/convenience.sh" ~/.bashrc ; then
    echo -e "\e[1;32mAdding sourcing convenience.sh to .bashrc...\e[0m"
    echo "source /home/pi/stagehands/bot_setup/raspberry_scripts/convenience.sh" >> ~/.bashrc
fi

echo -e "\e[1;32mDone!\e[0m"