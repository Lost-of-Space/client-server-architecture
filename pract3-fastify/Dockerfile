# Use official Node.js image as base
FROM node:22

# Set working directory inside the container
WORKDIR /srv/node/app

RUN npm install -g nodemon

# Copy only necessary files
COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R node /srv/node/app

USER node

# Expose the port that the app will run on
EXPOSE 3000

EXPOSE 9229

# Command to run the app
CMD ["nodemon", "--inspect=0.0.0.0:9229", "server.js"]
