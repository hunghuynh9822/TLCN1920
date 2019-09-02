FROM openjdk:8-jdk-alpine
WORKDIR /docker/server/
COPY target/workmanagement-0.0.1-SNAPSHOT.jar ./workmanagement-0.0.1-SNAPSHOT.jar
RUN ls ./
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","./workmanagement-0.0.1-SNAPSHOT.jar"]