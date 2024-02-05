FROM node:20.11-alpine

ENV NODE_ENV development

RUN apk update && apk add build-base
WORKDIR /application

COPY --chown=node:node package*.json ./

RUN npm install -g npm@9.6.7
RUN npm install -g @nestjs/cli@10.3.0
RUN npm ci

COPY --chown=node:node . /application

USER node
