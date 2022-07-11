# base image
FROM node:18.5.0-alpine3.15
# set working directory
WORKDIR /usr/src/app
# install and cache app dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 100000

COPY . .

# start app
ENV REACT_APP_URL http://localhost:3000/
ENV REACT_APP_API http://localhost:5002/
ENV REACT_APP_AAS http://localhost:5001/
CMD ["yarn", "start"]
EXPOSE 3000