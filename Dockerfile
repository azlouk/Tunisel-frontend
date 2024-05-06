# Use the official Node.js image as a base
FROM node:18.20.1 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci
RUN npm install -g @angular/cli
RUN npm i

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build

# Use Nginx to serve the Angular app in production
FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/tuniselfrontend /usr/share/nginx/html
