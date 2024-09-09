# Stage 1: Build the Angular app
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies and cache node_modules
COPY package*.json ./
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
COPY --from=app /app/dist/tuniselfrontend /usr/share/nginx/html

# Copy custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 90

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
