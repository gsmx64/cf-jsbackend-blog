FROM node:20.14 AS build-phase

WORKDIR /app-build

COPY . .

RUN npm install typescript -g
RUN npm i
RUN npm run build


FROM node:20.14-alpine

ENV NODE_ENV development

WORKDIR /app-frontend

RUN apk update && apk add nginx openrc build-base
RUN rc-update add nginx default

COPY --from=build-phase /app-build/ /app-frontend

RUN cp .env.docker.sample .env.development

#RUN rc-service nginx restart

EXPOSE 80
EXPOSE 3000

CMD ["nginx","-g","daemon off;"]

CMD ["npm", "run", "start:dev"]