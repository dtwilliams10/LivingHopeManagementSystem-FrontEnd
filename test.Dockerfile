# base image
FROM node:current-alpine

# set working directory
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 100000
#RUN yarn global add react-scripts

COPY . .

# start app
CMD ["yarn", "start"]