ARG BASE_PATH=/
ARG API_URL=http://127.0.0.1:8000
ARG SC_URL=ws://localhost:8090
ARG PORT=3003
#nodejs stage to build frontent 
FROM node:16-alpine AS base 

# potential devcontainer environment
FROM base as development
WORKDIR /app
COPY package.json ./
#COPY package-lock.json ./
RUN npm install
EXPOSE 3003
EXPOSE 3005
ENTRYPOINT npm start

FROM development as builder
ARG BASE_PATH
ARG API_URL
ARG SC_URL
ARG PORT
WORKDIR /app
COPY . .
RUN npm run build

FROM base AS production
WORKDIR /sc-web-frontend
COPY --from=builder /app/package.json ./
#COPY --from=builder /app/package-lock.json ./
RUN npm install --omit dev
COPY --from=builder /app/build ./build
COPY --from=builder /app/server ./server
COPY --from=builder /app/public ./public
EXPOSE 3003
ENTRYPOINT npm run serve
