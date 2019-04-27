# base image
FROM node:current-alpine

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
#ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts -g --silent

COPY . .

# start app
CMD ["npm", "start"]