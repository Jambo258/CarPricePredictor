FROM cypress/browsers:node14.17.0-chrome89-ff86

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx", "cypress", "run"]