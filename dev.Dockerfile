# base image
FROM node:21-alpine3.18
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
ENV VITE_APP_URL http://localhost:3000/
ENV VITE_APP_API http://localhost:5002/
ENV VITE_APP_AAS http://localhost:5001/

CMD ["yarn", "start"]
EXPOSE 3000