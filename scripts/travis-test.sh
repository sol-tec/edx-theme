#!/usr/bin/env bash

docker run btelnes/devstack /bin/bash -c "sudo su edxapp; paver update_assets"

# Updates requirements and compiles javascript, Sass and CoffeeScript
# paver update_assets

