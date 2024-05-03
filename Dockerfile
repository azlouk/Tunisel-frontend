FROM node:18.20.1-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /app
# Copy files to virtual directory
# COPY package.json package-lock.json ./
# Run command in Virtual directory
COPY package*.json ./
RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm install --force
RUN npx ngcc --properties es
RUN npm run build


### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:stable AS ngi
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder
COPY --from=build /app/dist/tuniselfrontend /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# Exposing a port, here it means that inside the container
# the app will be using Port 80 while running
EXPOSE 80
#server {
#  listen 80;
#  sendfile on;
#  default_type application/octet-stream;
#
#  gzip on;
#  gzip_http_version 1.1;
#  gzip_disable      "MSIE [1-6]\.";
#  gzip_min_length   256;
#  gzip_vary         on;
#  gzip_proxied      expired no-cache no-store private auth;
#  gzip_types        text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
#  gzip_comp_level   9;
#
#  root /usr/share/nginx/html;
#
#  location / {
#    try_files $uri $uri/ /index.html =404;
#  }
#}
