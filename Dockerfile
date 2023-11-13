FROM node:16.17 as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install -g n
RUN n 16.17.1
RUN npm install
COPY ./ .
RUN rm -rf nginx

RUN npm run build -- --base-href=/dazer/

FROM nginx:mainline-alpine

RUN apk update && apk add --upgrade apk-tools && apk upgrade --available

COPY --from=build-stage /app/dist/subsampling-frontend/ /usr/share/nginx/html/dazer/

COPY nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80
