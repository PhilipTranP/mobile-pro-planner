#!/bin/bash
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
apt-get -qqy update
apt-get -qqy upgrade
apt-get install -qqy mongodb-org
cp /vagrant/config/mongodb.service /etc/systemd/system/mongodb.service
systemctl start mongodb
systemctl enable mongodb
curl -sL https://deb.nodesource.com/setup_6.x | -E bash -
sudo apt-get install -qqy nodejs
apt-get install -qqy build-essential
npm install -g nodemon
