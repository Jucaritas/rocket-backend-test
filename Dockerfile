# Use the official Node.js 20.11 image
FROM node:22.13

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install NestJS dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app using Nest CLI
CMD ["npm", "run", "start:prod"]