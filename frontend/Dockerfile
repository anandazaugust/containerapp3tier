FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --production

# Copy rest of the app
COPY . .

# Use port from environment (ACA sets PORT), fallback to 3000
ENV PORT=3000

# Expose the port (optional for ACA, but good practice)
EXPOSE ${PORT}

# Start the app
CMD ["node", "server.js"]
