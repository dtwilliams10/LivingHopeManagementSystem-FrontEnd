### STAGE 1: Build ###
FROM node:17.9.0-alpine as builder
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 100000
COPY . .
RUN yarn build
### STAGE 2: Production Environment ###
FROM nginx:1.21.6-alpine
ENV NODE_ENV production
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
