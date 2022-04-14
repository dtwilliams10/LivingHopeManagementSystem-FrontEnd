# base image
FROM node:17.9.0-alpine
# set working directory
WORKDIR /usr/src/app
# install and cache app dependencies
ENV NODE_ENV staging
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 100000

COPY . .

# start app
CMD ["yarn", "start"]