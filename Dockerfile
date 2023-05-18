# Base image
FROM node:alpine AS base
WORKDIR /app
# RUN npm install -g npm@latest
COPY package.json ./
RUN yarn install 
COPY . .
RUN yarn build

# Production image
FROM node:alpine AS prod
WORKDIR /app
COPY --from=base /app/dist ./dist
COPY package.json ./
RUN yarn install --omit=dev
EXPOSE 5000

# Start the application