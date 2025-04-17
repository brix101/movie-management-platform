# Use the official Node.js image as a base image
FROM node:22

# Set the working directory
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port Angular will serve the app on
EXPOSE 4200

# Run the Angular app using the ng serve command
CMD ["ng", "serve", "--host", "0.0.0.0"]


