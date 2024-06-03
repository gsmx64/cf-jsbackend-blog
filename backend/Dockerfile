FROM node:20.14 AS build-phase

WORKDIR /usr/src/app

COPY . .

COPY --chown=node:node package*.json ./

RUN npm install -g @nestjs/cli@10.3.0
RUN npm ci
#RUN npm run build


FROM node:20.14-alpine

ENV NODE_ENV development

EXPOSE 3001

RUN apk update && apk add build-base

WORKDIR /application

COPY --from=build-phase --chown=node:node /usr/src/app/ /application

COPY --from=build-phase --chown=node:node /usr/src/app/package*.json ./

RUN npm install -g @nestjs/cli@10.3.0
RUN npm ci
#RUN npm run build

ENTRYPOINT ["npm","run","--prefix","/application","start:dev"]

