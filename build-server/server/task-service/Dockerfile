FROM openjdk:8-jdk-alpine
WORKDIR /server/task-service
COPY task-service-1.0.0.jar ./task-service-1.0.0.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./task-service-1.0.0.jar",">> logs/task-servie-console.log"]