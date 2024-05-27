# Use the official Node.js 20.9.0 image
FROM node:20.9.0

# Create and change to the app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start the app in development mode
CMD ["npm", "run", "dev", "--", "--host"]

