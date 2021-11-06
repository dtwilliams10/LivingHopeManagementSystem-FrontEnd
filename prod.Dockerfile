### STAGE 1: Build ###
FROM node:current-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 100000
COPY . .
RUN yarn build
### STAGE 2: Production Environment ###
FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
