#!/usr/bin/env bash

docker run -i btelnes/devstack /bin/bash -s <<EOF
sudo su edxapp
source /edx/app/edxapp/edxapp_env
# Updates requirements and compiles javascript, Sass and CoffeeScript
paver update_assets
EOF
