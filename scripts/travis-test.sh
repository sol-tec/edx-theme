#!/usr/bin/env bash

docker run -i btelnes/devstack /bin/bash -s <<EOF
sudo su edxapp
source /edx/app/edxapp/edxapp_env
cd /edx/app/edxapp/edx-platform
# Updates requirements and compiles javascript, Sass and CoffeeScript
paver update_assets --settings devstack_docker
EOF
