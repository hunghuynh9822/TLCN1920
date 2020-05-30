#!/bin/bash
root="/home/liem/TLCN1920/src/microservice-server"
#-------------------------------------------------
temp=0
for i in $(cat list_service.txt); do
echo "$temp: $i"
temp=$((temp+1))
done

#========
a=0
read -p 'Input number service: ' service
for i in $(cat list_service.txt); do
    if [ $a == $service ]
    then
        echo "------------------------"
        kill -9 $(ps -ef | grep $i | grep -v 'color'| awk '{print $2}')
        #mvn clean install -DskipTests
        echo $i
        cd ./$i
        #mvn clean package -DskipTests
        file_jar=$(ls ./target | grep '.jar' | grep -v '.original')
        if [[ $service == 0 || $service == 1 ]]
        then
            java -jar -Xmx300M -Xms250M ./target/$file_jar >> $root/logs/$i.log &
            sleep 10
        else
            java -jar -Xmx500M -Xms300M ./target/$file_jar >> $root/logs/$i.log &
            sleep 10
        fi
    fi
    a=$((a+1))
done

