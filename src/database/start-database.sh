# Start database in docker-compose
echo "Start Database"
sudo docker-compose -f postgres.yml stop
sudo nohup docker-compose -f postgres.yml up --build --force-recreate > logs/database.out 2>&1 &
echo "Finish start Database"