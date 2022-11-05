FROM node:14.21.0-slim as installer
WORKDIR /builder
COPY ./package*.json .
RUN npm ci

FROM node:14.21.0-slim as builder
WORKDIR /builder
COPY --from=installer /builder .
COPY . .
RUN npm run build

FROM node:14.21.0-slim as runner
COPY --from=builder /builder /app
ENTRYPOINT ["node", "/app/dist/index.js"]