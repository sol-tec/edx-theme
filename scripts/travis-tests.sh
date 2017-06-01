#if ! id -u edxapp > /dev/null 2>&1; then
#  # create required edxapp user account
#  sudo adduser --disabled-password --gecos "" edxapp
#
#  # set the edxapp password
#  #sudo usermod --password P@$$sw0rd edxapp
#fi

#sudo -H -u edxapp bash
#source /edx/app/edxapp/edxapp_env
#cd /edx/app/edxapp/edx-platform

# Updates requirements and compiles javascript, Sass and CoffeeScript
#paver update_assets


sudo -H bash


