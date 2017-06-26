#!/usr/bin/env bash

docker exec -d devstack sudo su edxapp

# Updates requirements and compiles javascript, Sass and CoffeeScript
docker exec -d paver update_assets

