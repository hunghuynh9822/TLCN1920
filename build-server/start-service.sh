#!/bin/bash
# Start one service in docker-compose
if [[ ( $1 == "" ) ]];
then
        echo "No service"
else
        echo "Start $1"
        sudo docker-compose -f docker-compose-server.yml stop $1
        sudo docker-compose -f docker-compose-server.yml build $1
        sudo docker-compose -f docker-compose-server.yml create $1
        sudo docker-compose -f docker-compose-server.yml start $1
        echo "Finish start $1"
fi