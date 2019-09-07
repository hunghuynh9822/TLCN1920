#FROM maven:3.5.2-jdk-8-alpine AS MAVEN_TOOL_CHAIN
#COPY pom.xml /docker/server/
#COPY src /docker/server/src/
#WORKDIR /docker/server/
#RUN ls && mvn clean package
FROM openjdk:8-jdk-alpine
WORKDIR /docker/server/
COPY target/workmanagement-0.0.1-SNAPSHOT.jar ./workmanagement-0.0.1-SNAPSHOT.jar
RUN ls
#CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./target/workmanagement-0.0.1-SNAPSHOT.jar"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./workmanagement-0.0.1-SNAPSHOT.jar"]