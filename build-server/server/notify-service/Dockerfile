FROM openjdk:8-jdk-alpine
WORKDIR /server/notify-service
COPY notify-service-1.0.0.jar ./notify-service-1.0.0.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./notify-service-1.0.0.jar"]