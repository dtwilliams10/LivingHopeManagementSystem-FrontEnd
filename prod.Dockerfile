### STAGE 1: Build ###
FROM node:18.5.0-alpine3.16 as builder
WORKDIR /usr/src/app
RUN yarn set version berry
COPY package*.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
RUN yarn install --network-timeout 100000
COPY . .
RUN yarn build
### STAGE 2: Production Environment ###
FROM nginx:1.21.6-alpine
ENV REACT_APP_URL https://lhms.dtwilliams10.com/
ENV REACT_APP_API https://systemreports.dtwilliams10.com/
ENV REACT_APP_AAS https://aas.dtwilliams10.com/
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
