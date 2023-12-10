# Builder
FROM node:alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build:all

# Runner
FROM node:alpine as runner

VOLUME /data

WORKDIR /app

COPY --from=builder /app/dist/apps apps/
COPY --from=builder /app/node_modules node_modules/

EXPOSE 3000

CMD ["node", "apps/backend/main.js"]
