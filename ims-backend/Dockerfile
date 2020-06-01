FROM gradle:5.4.1-jdk8-alpine AS build

COPY --chown=gradle:gradle . /home/gradle/src

WORKDIR /home/gradle/src

RUN gradle build --no-daemon

FROM openjdk:8-jdk-alpine 

VOLUME /tmp 

COPY --from=build /home/gradle/src/build/libs/*.jar /app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app.jar"]