FROM node:14.21.0-slim as installer
WORKDIR /builder
COPY ./package*.json .
RUN npm ci

FROM node:14.21.0-slim as builder
WORKDIR /builder
COPY --from=installer /builder .
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=builder /builder/dist /usr/share/nginx/html
