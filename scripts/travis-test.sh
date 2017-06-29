#!/usr/bin/env bash

docker exec -i devstack /bin/bash -s <<EOF
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
