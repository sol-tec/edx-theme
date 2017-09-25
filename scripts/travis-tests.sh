#!/usr/bin/env bash

# Determine the appropriate github branch to clone using Travis environment variables
BRANCH=${TRAVIS_PULL_REQUEST_BRANCH:-$TRAVIS_BRANCH}
echo "BRANCH=$BRANCH"

docker exec -i devstack /bin/bash -s <<EOF
# Ensure that MySql is running.  Fixes error "Can't connect to MYSQL server on '127.0.0.1' (111)"
UP=$(/etc/init.d/mysql status | grep running | grep -v not | wc -l);
if [[ "$UP" -ne "1" ]]; then echo "Starting MySQL..."; systemctl start mysql.service; fi

# Switch to the edxapp user
sudo su edxapp

# Get the latest theme files
cd /edx/app/edxapp
rm -r -d -f themes
git clone -b $BRANCH https://github.com/Microsoft/edx-theme.git themes

# Source the edxapp_env file to set various required environment variables
source /edx/app/edxapp/edxapp_env
cd /edx/app/edxapp/edx-platform

# Updates requirements and compiles javascript, Sass and CoffeeScript
paver update_assets --settings docker_devstack
EOF
