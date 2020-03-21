

FROM node:latest AS build-stage

WORKDIR /app
COPY . . 

RUN echo "Build stage"
RUN npm install

# Took too long
# FROM newtmitch/sonar-scanner:latest as sonarqube-stage
# RUN echo "Run sonarqube static code analysis"
# COPY --from=build-stage /app/src/ /root/src

FROM node:alpine

RUN echo "Copy built files"
WORKDIR /app
COPY --from=build-stage /app .

EXPOSE 80
