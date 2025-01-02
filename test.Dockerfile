# Build stage
FROM node:23.5.0-alpine3.21 AS builder
ENV YARN_CACHE_FOLDER=/root/.yarn/cache
WORKDIR /usr/src/app
RUN yarn set version 4.6.0

COPY package*.json yarn.lock .yarnrc.yml ./

RUN yarn cache clean && yarn install

COPY . .

RUN yarn build:test

# # Production stage
FROM nginxinc/nginx-unprivileged:alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]