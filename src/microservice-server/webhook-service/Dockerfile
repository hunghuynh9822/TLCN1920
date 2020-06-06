FROM openjdk:8-jdk-alpine
WORKDIR /docker/server/webhook-service
COPY target/webhook-service-1.0.0.jar ./webhook-service-1.0.0.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./webhook-service-1.0.0.jar"]