FROM openjdk:8-jdk-alpine
WORKDIR /docker/server/discovery-server
COPY target/discovery-server-1.0.0.jar ./discovery-server-1.0.0.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./discovery-server-1.0.0.jar"]