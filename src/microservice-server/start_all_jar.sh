#!/bin/bash

#----
rm -f ../logs/*
mvn clean install -DskipTests
for i in $(cat list_service.txt); do
echo "========================================="
echo $i
cd ./$i
mvn clean package -DskipTests
file_jar=$(ls ./target | grep '.jar' | grep -v '.original')
if [ $i == "gateway-proxy" ]
then
java -jar -Xmx300M -Xms250M ./target/$file_jar >> ../logs/$i.log &
sleep 10
elif [ $i == "discovery-server" ]
then
java -jar -Xmx300M -Xms250M ./target/$file_jar >> ../logs/$i.log &
sleep 10
else
java -jar -Xmx500M -Xms300M ./target/$file_jar >> ../logs/$i.log &
sleep 10
fi
cd ..
done
