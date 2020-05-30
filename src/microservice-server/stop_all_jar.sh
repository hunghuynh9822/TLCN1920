#!/bin/bash

for i in $(ps -ef | grep java | grep -v 'color'| awk '{print $2}')
do
kill -9 $i
done
