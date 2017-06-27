#!/usr/bin/env bash

docker run -i btelnes/devstack /bin/bash -s <<EOF
sudo su edxapp -s /bin/bash
source /edx/app/edxapp/edxapp_env
cd /edx/app/edxapp/edx-platform
paver update_assets
EOF

# Updates requirements and compiles javascript, Sass and CoffeeScript
# paver update_assets

