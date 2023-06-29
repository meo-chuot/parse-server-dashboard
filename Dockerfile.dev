FROM node:lts-alpine
WORKDIR /srv
ENV NODE_ENV development

COPY . .
RUN npm install

CMD ["npm", "run", "dev"]
