FROM node:20.9.0-alpine

WORKDIR /portfolio
COPY package*.json .
RUN npm install
RUN apk update
RUN apk add git
COPY . .
EXPOSE 3000

CMD ["npm", "run", "dev"]