FROM node:lts-alpine as base
WORKDIR /srv

FROM base as builder
WORKDIR /srv
RUN apk add curl
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
COPY . .
RUN npm install --no-scripts --omit=dev
RUN node-prune

FROM base as runner
WORKDIR /srv
COPY --from=builder /srv/entrypoint.sh /srv/index.js /srv/package*.json ./
COPY --from=builder /srv/node_modules ./node_modules
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
