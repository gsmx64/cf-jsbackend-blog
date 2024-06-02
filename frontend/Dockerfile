FROM node:20.11-alpine as builder

ENV NODE_ENV development

WORKDIR /application

COPY --chown=node:node package*.json ./

RUN npm install -g npm@9.6.7
npm install typescript -g
RUN npm run build

COPY --chown=node:node . /application

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /application/dist .
EXPOSE 80
USER node
CMD ["nginx","-g","daemon off;"]