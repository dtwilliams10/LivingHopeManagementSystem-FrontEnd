# base image
FROM node:17.9.0-alpine
# set working directory
WORKDIR /usr/src/app
# install and cache app dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 100000

COPY . .

# start app
ENV REACT_APP_URL https://test.lhms.dtwilliams10.com/
ENV REACT_APP_API https://test.systemreports.dtwilliams10.com/
ENV REACT_APP_AAS https://test.aas.dtwilliams10.com/
CMD ["yarn", "start"]