FROM openjdk:8-jdk-alpine
WORKDIR /server/webhook-service
COPY webhook-service-1.0.0.jar ./webhook-service-1.0.0.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./webhook-service-1.0.0.jar",">> logs/webhook-service-console.log"]