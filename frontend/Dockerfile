# syntax=docker/dockerfile:1
FROM node:23.9.0 AS build
WORKDIR /app
COPY package.json .
RUN npm install --dev
COPY . .
RUN npm run build
RUN npm prune --production


FROM node:23.9.0 as run
WORKDIR /app

COPY --from=build /app/build build/
COPY --from=build /app/node_modules node_modules
COPY package*.json .
EXPOSE 3000
ENV NODE_ENV=production
RUN npm install --production
CMD ["node", "build"]