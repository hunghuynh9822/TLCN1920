cd discovery-server/
java -jar -Xmx300M -Xms200M target/discovery-server-1.0.0.jar > ~/ute/TLCN1920/logs/discovery.log&
cd ..
cd gateway-proxy/
java -jar -Xmx300M -Xms200M target/gateway-proxy-1.0.0.jar >  ~/ute/TLCN1920/logs/gateway.log&
cd ..
cd auth-service/
java -jar -Xmx500M -Xms300M target/auth-service-1.0.0.jar > ~/ute/TLCN1920/logs/auth.log&
cd ..
cd employee-service/
java -jar -Xmx500M -Xms300M target/employee-service-1.0.0.jar > ~/ute/TLCN1920/logs/employee.log&
cd ..
cd project-service/
java -jar -Xmx500M -Xms300M target/project-service-1.0.0.jar > ~/ute/TLCN1920/logs/project.log&
cd ..
cd task-service/
java -jar -Xmx500M -Xms300M target/task-service-1.0.0.jar > ~/ute/TLCN1920/logs/task.log&

