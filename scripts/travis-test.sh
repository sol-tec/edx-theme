#!/usr/bin/env bash

docker run -i btelnes/devstack /bin/bash -s <<EOF
sudo su edxapp
paver update_assets
EOF

# Updates requirements and compiles javascript, Sass and CoffeeScript
# paver update_assets

