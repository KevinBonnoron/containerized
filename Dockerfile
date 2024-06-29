# Builder
FROM node:alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn prisma:generate
RUN yarn build

# Runner
FROM node:alpine AS runner
VOLUME /data
RUN apk add --no-cache tini
COPY --chown=node:node --from=builder /app/.env ./
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules node_modules/
COPY --chown=node:node --from=builder /app/libs/db/src/prisma  ./prisma

ENV NODE_ENV production
EXPOSE 3000
CMD ./node_modules/prisma/build/index.js migrate deploy; /sbin/tini -- node dist/apps/backend/main.js
