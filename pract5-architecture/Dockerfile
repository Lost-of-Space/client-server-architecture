# First stage: Development environment
FROM node:22 AS development

# Create and set the working directory inside the container
WORKDIR /srv/node/app

# Install pnpm globally for better dependency management
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (якщо є)
COPY package*.json pnpm-lock.yaml ./

# Install dependencies with pnpm
RUN pnpm install

# Copy the rest of the application
COPY --chown=node:node . .

# Switch to the node user
USER node

# Run Prisma commands if REBUILD_PRISMA_CLIENT is set to true
RUN if [ "$REBUILD_PRISMA_CLIENT" = "true" ]; then \
  pnpm db:sync && pnpm prisma generate; \
  fi

# Expose the port the app runs on
EXPOSE 3000

# Expose the debugging port
EXPOSE 9229

# Set the NODE_ENV environment variable to development by default
ENV NODE_ENV=development

# Use nodemon for automatic server reloads in development
CMD ["pnpm", "nodemon", "--inspect=0.0.0.0:9229", "server.js"]
