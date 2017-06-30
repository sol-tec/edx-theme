#!/usr/bin/env bash

docker exec -i devstack /bin/bash -s <<EOF
# Ensure that MySql is running.  Fixes error "Can't connect to MYSQL server on '127.0.0.1' (111)"
UP=$(/etc/init.d/mysql status | grep running | grep -v not | wc -l);
if [[ "$UP" -ne "1" ]]; then echo "Starting MySQL..."; service mysql start; sleep 10; fi
sudo su edxapp
cd /edx/app/edxapp
rm -r -d -f themes

# Get the latest theme files
git clone -b oxa/devfic https://github.com/Microsoft/edx-theme.git themes
source /edx/app/edxapp/edxapp_env
cd /edx/app/edxapp/edx-platform

# Updates requirements and compiles javascript, Sass and CoffeeScript
paver update_assets --settings docker_devstack
EOF
