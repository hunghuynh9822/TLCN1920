FROM openjdk:8-jdk-alpine
WORKDIR /server/auth-service
COPY auth-service-1.0.0.jar ./auth-service-1.0.0.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./auth-service-1.0.0.jar",">> logs/auth-servie-console.log"]