# Start database in docker-compose
mkdir logs
echo "Start Database"
sudo docker rm -f docker-postgres
sudo nohup docker-compose -f postgres.yml up --build --force-recreate > logs/database.out 2>&1 &
echo "Finish start Database"
