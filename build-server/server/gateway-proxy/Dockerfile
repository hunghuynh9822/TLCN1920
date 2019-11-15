FROM openjdk:8-jdk-alpine
WORKDIR /docker/server/gateway-proxy
COPY gateway-proxy-1.0.0.jar ./gateway-proxy-1.0.0.jar
VOLUME  ["/logs"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./gateway-proxy-1.0.0.jar"]