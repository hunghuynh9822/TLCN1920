FROM openjdk:8-jdk-alpine
WORKDIR /server/gateway-proxy
COPY project-service-1.0.0.jar ./project-service-1.0.0.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./project-service-1.0.0.jar",">> logs/project-servie-console.log"]