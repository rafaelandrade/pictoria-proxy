FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy local code to the container image.
COPY . ./

# Build app
RUN npm run build

# Run the web service on container startup.
CMD ["npm", "start"]