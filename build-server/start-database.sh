#!/bin/bash
# Start database in docker-compose
echo "Start Database"
sudo docker-compose -f postgres.yml stop
sudo nohup docker-compose -f postgres.yml up --build > logs/database.log &
echo "Finish start Database"
