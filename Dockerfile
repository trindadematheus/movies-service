FROM node:16.11.0-alpine3.12

RUN apk add --no-cache bash

RUN npm install -g pnpm

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app
