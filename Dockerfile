FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY index.html vite.config.js ./
COPY src ./src
RUN npm run build

FROM node:20-slim
WORKDIR /app
ENV NODE_ENV=production
COPY server.js package.json ./
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["node", "server.js"]
