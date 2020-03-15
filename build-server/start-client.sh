#!/bin/bash
# Start database in docker-compose
echo "Start Database"
sudo docker-compose -f docker-compose-client.yml stop
sudo nohup docker-compose -f docker-compose-client.yml up --build > logs/client.log &
echo "Finish start Database"
