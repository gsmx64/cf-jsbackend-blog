FROM node:20.14 AS build-phase

WORKDIR /usr/src/app

COPY . .

COPY --chown=node:node package*.json ./

RUN npm install typescript -g
RUN npm ci
#RUN npm run build


FROM node:20.14-alpine

ENV NODE_ENV development

EXPOSE 80
EXPOSE 3000

RUN apk update && apk add nginx openrc build-base
#RUN rc-update add nginx default

WORKDIR /application

COPY --from=build-phase --chown=node:node /usr/src/app/ /application

COPY --from=build-phase --chown=node:node /usr/src/app/package*.json ./

RUN npm install typescript -g
RUN npm ci
RUN npm run build

#RUN rc-service nginx restart

#CMD ["nginx","-g","daemon off;"]

ENTRYPOINT ["npm","run","--prefix","/application","start:dev"]