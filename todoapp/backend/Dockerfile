# Use the Node.js base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the application code
COPY . .

# Expose the backend port
EXPOSE 3000

# Start the backend
CMD ["npm", "start"]
