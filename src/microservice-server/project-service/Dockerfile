FROM openjdk:8-jdk-alpine
WORKDIR /docker/server/project-service
COPY target/project-service-1.0.0.jar ./project-service-1.0.0.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./project-service-1.0.0.jar"]