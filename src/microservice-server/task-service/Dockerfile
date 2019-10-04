FROM openjdk:8-jdk-alpine
WORKDIR /docker/server/task-service
COPY target/task-service-0.0.1-SNAPSHOT.jar ./task-service-0.0.1-SNAPSHOT.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./task-service-0.0.1-SNAPSHOT.jar"]