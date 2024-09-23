# Build stage
FROM node:21-alpine3.19 AS builder
WORKDIR /usr/src/app
RUN yarn set version 4.2.1

COPY package*.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./

RUN yarn install

COPY . .

RUN yarn build:test

# Production stage
FROM nginx:alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]