### STAGE 1: Build ###
FROM node:current-alpine as builder
#RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN yarn install --silent --pure-lockfile
RUN yarn install react-scripts -g --silent
COPY . /usr/src/app
RUN yarn run build

### STAGE 2: Production Environment ###
FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]