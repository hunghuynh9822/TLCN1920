FROM openjdk:8-jdk-alpine
WORKDIR /docker/server/employee-service
COPY target/employee-service-1.0.0.jar ./employee-service-1.0.0.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./employee-service-1.0.0.jar"]