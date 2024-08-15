FROM node:18.20.1 AS build
WORKDIR /dist/src/app
RUN npm cache clean --force
COPY . .
RUN npm install --force
RUN npm run build --prod

FROM nginx:1-alpine AS ngi
COPY --from=build /dist/tuniselfrontend/browser/ /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
