# base image
FROM node:current-alpine

# set working directory
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts -g --silent

COPY . .

# start app
CMD ["npm", "start"]