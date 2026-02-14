########################################
#1.Builder stage
########################################

FROM node:18-alpine AS builder

WORKDIR /app

#Install dependencies
COPY package*.json  ./
RUN npm install  --only=production

#copy application code

COPY . . 
##########################################
#2.Runtime stage (minimal ,Secure)
##########################################

FROM node:18-alpine

WORKDIR /app
#Create a non-root user 
RUN addgroup -S appgroup  && adduser -S appuser -G appgroup

#Copy only the node_modules and app code form builder 
COPY --form=builder /app/node_modules ./node_modules
COPY --form=builder /app/server.js ./server.js 
COPY --form=builder /app/package.json ./package.json

# Ensure the permission for the non-root user
RUN chown  -R appuser:appgroup /app

#Swith to the non-root user
USER appuser

#Expose only the required part
EXPOSE 3000

#HealthChecks  for kubernetes
HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Start the node js app
CMD [ "node" , "server.js"]
