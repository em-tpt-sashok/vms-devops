# Base image with Node.js
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
# Start the Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
