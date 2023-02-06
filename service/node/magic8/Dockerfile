FROM node:18.4.0-alpine3.16

WORKDIR /magic8

COPY node_modules/ node_modules/
COPY src/ ./
COPY api.yaml package.json ./

EXPOSE 3000

CMD [ "node", "api.js" ]