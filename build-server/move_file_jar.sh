#!/bin/bash

for i in `ls server/`
do
rm -f server/$i/$i-1.0.0.jar
cp ../src/microservice-server/$i/target/$i-1.0.0.jar server/$i/
done
echo "Move file jar done"