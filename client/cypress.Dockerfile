#FROM cypress/browsers:node-20.9.0-chrome-118.0.5993.88-1-ff-118.0.2-edge-118.0.2088.46-1

#WORKDIR /app

#COPY package*.json ./

#RUN npm install

#COPY . .

#CMD ["npm", "run", "cy:run:docker"]

FROM cypress/base:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


RUN npx cypress verify