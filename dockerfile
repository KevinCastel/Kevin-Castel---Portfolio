FROM node:22.4-alpine

WORKDIR /portfolio
COPY package*.json .
RUN npm install
RUN npm i baseline-browser-mapping@latest -D

RUN apk update
RUN apk add git


COPY . .
EXPOSE 3000

CMD ["npm", "run", "dev"]