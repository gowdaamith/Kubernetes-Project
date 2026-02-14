# ============================
# 1. Builder Stage
# ============================
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# ============================
# 2. Runtime Stage (Minimal, Secure)
# ============================
FROM node:18-alpine

WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy ONLY the node_modules and app code from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/package.json ./package.json

# Ensure permissions for non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root
USER appuser

# Expose only required port
EXPOSE 3000

# HEALTHCHECK for Kubernetes
HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Start the Node.js app
CMD ["node", "server.js"]
