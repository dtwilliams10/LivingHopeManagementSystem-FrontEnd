### STAGE 1: Build ###
FROM node:current-alpine as builder
RUN npm install -g react-scripts --silent
WORKDIR /app
COPY . .
RUN npm install --silent
RUN npm run build

### STAGE 2: Production Environment ###
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]