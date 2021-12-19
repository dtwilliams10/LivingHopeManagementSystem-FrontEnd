# base image
FROM node:16.13.1-alpine

#ENV NODE_OPTIONS=--openssl-legacy-provider

# set working directory
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 100000

COPY . .

# start app
CMD ["yarn", "start"]
