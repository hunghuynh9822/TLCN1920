#!/bin/bash
# Start database in docker-compose
echo "Start Server"
sudo docker-compose -f docker-compose-server.yml stop
sudo nohup docker-compose -f docker-compose-server.yml up --build --force-recreate > logs/server.out &
echo "Finish start Server"
