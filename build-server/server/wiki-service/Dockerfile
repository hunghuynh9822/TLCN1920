FROM openjdk:8-jdk-alpine
WORKDIR /server/wiki-service
COPY wiki-service-1.0.0.jar ./wiki-service-1.0.0.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./wiki-service-1.0.0.jar",">> logs/wiki-service-console.log"]