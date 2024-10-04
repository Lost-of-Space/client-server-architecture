# Use official Node.js image as base
FROM node:18

# Set working directory inside the container
WORKDIR /srv/app

# Copy only necessary files
COPY package*.json ./

RUN npm install

COPY . .
# Expose the port that the app will run on
EXPOSE 3000

# Command to run the app
CMD ["node", "app.js"]
