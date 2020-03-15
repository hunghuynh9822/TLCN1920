#!/bin/bash
# Start database in docker-compose
echo "Start Database"
sudo nohup docker-compose -f docker-compose-server.yml stop
sudo nohup docker-compose -f docker-compose-server.yml up --build > logs/server.log &
echo "Finish start Database"
