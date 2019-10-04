FROM openjdk:8-jdk-alpine
WORKDIR /docker/server/employee-service
COPY target/employee-service-0.0.1-SNAPSHOT.jar ./employee-service-0.0.1-SNAPSHOT.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./employee-service-0.0.1-SNAPSHOT.jar"]