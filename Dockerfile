FROM node:16.13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]
