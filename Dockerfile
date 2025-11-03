# ------------------------------------------------------------
# 1️⃣ Build stage - build your Vite React app
# ------------------------------------------------------------
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for faster build caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Build the app
RUN npm run build

# ------------------------------------------------------------
# 2️⃣ Production stage - serve the built files
# ------------------------------------------------------------
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Copy package.json (optional if you want npm scripts available)
COPY package*.json ./

# Install only production dependencies (if any)
RUN npm install --omit=dev

# Expose the port used by Vite preview
EXPOSE 3000

# Run Vite preview in production mode and listen on all interfaces
CMD ["npx", "vite", "preview", "--port", "3000", "--host"]
