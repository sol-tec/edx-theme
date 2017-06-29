#!/usr/bin/env bash

docker exec -i devstack /bin/bash -s <<EOF
sudo mkdir /tmp/edx-theme
cd /tmp/edx-theme
sudo git clone -b oxa/devfic https://github.com/Microsoft/edx-theme.git
cp -r -u /tmp/edx-theme /edx/app/edxapp/themes
sudo su edxapp
source /edx/app/edxapp/edxapp_env
cd /edx/app/edxapp/edx-platform
# Updates requirements and compiles javascript, Sass and CoffeeScript
paver update_assets --settings docker_devstack
EOF
