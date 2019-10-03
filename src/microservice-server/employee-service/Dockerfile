FROM openjdk:8-jdk-alpine
WORKDIR /docker/server/employee-service
COPY target/employee-service-0.0.1-SNAPSHOT.jar ./employee-service-0.0.1-SNAPSHOT.jar
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./workmanagement-0.0.1-SNAPSHOT.jar"]