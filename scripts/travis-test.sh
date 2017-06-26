#!/usr/bin/env bash

docker  exec -i -t devstack /bin/bash

sudo su edxapp

# Updates requirements and compiles javascript, Sass and CoffeeScript
paver update_assets

