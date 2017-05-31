sudo -H -u edxapp bash
source /edx/app/edxapp/edxapp_env
cd /edx/app/edxapp/edx-platform

# Updates requirements and compiles javascript, Sass and CoffeeScript
paver update_assets
