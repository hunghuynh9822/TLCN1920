FROM openjdk:8-jdk-alpine
WORKDIR /docker/server/request-service
COPY request-service-1.0.0.jar ./request-service-1.0.0.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./request-service-1.0.0.jar"]