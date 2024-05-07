# base image
FROM node:21-alpine3.19
# set working directory
WORKDIR /usr/src/app
RUN yarn set version stable
# install and cache app dependencies
COPY package*.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
RUN yarn install

COPY . .

# start app
ENV VITE_APP_URL https://test.lhms.dtwilliams10.com/
ENV VITE_APP_API https://test.systemreports.dtwilliams10.com/
ENV VITE_APP_AAS https://test.aas.dtwilliams10.com/

EXPOSE 3000

CMD ["yarn", "start", "--host"]