FROM node:16.13-alpine

WORKDIR /app

COPY package*.json ./

RUN apk update && apk add bash

RUN npm i -g sequelize-cli
RUN npm i

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]
