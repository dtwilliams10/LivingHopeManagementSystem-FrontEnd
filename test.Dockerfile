# base image
FROM node:21-alpine3.18
# set working directory
WORKDIR /usr/src/app
RUN yarn set version stable
# install and cache app dependencies
COPY package*.json ./
#COPY yarn.lock ./
COPY .yarnrc.yml ./
RUN yarn install

COPY . .


# start app
ENV REACT_APP_URL https://test.lhms.dtwilliams10.com/
ENV REACT_APP_API https://test.systemreports.dtwilliams10.com/
ENV REACT_APP_AAS https://test.aas.dtwilliams10.com/

CMD ["yarn", "start"]
EXPOSE 3000
