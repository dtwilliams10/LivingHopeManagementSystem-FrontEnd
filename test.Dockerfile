# base image
FROM node:current

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
#ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./
RUN yarn 

COPY . .

EXPOSE 3000

# start app
CMD ["yarn", "start"]