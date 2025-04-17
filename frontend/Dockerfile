# Step 1: Use Node.js 22 as the base image to build the Angular app
FROM node:22 AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Angular app files to the container
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod

# Step 2: Set up NGINX to serve the Angular app
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=build-stage /app/dist/<your-app-name> /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 80

# Start NGINX when the container is run
CMD ["nginx", "-g", "daemon off;"]

