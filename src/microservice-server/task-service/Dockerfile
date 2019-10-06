FROM openjdk:8-jdk-alpine
WORKDIR /docker/server/task-service
COPY target/task-service-1.0.0.jar ./task-service-1.0.0.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./task-service-1.0.0.jar"]