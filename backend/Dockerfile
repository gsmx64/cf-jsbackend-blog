FROM node:20.14 AS build-phase

WORKDIR /app-build

COPY . .

RUN npm install -g @nestjs/cli@10.3.0
RUN npm i
RUN npm run build


FROM node:20.14-alpine

ENV NODE_ENV development

WORKDIR /app-backend

RUN apk update && apk add build-base

COPY --from=build-phase /app-build/ /app-backend

RUN cp .env.docker.sample .env.development

EXPOSE 3001

CMD ["npm", "run", "start:dev"]