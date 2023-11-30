FROM cypress/base:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


RUN npx cypress verify