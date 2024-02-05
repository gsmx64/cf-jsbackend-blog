FROM node:20.11-alpine

ENV NODE_ENV development

WORKDIR /application

COPY --chown=node:node package*.json ./

RUN npm install -g npm@9.6.7
RUN npm run build

COPY --chown=node:node . /application

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /application/dist /var/www/html/
EXPOSE 80
USER node
CMD ["nginx","-g","daemon off;"]