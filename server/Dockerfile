FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN cd /app && npm ci

EXPOSE 3001

CMD ["npm","run","dev"]