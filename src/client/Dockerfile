FROM node:10-alpine

EXPOSE 3000

RUN mkdir -p /docker/app/client/node_modules && chown -R node:node /docker/app/client
WORKDIR /docker/app/client

USER node

COPY --chown=node:node . .

RUN npm install && npm run build && cp -R ./public/ ./dist/

CMD ["npm","start"]