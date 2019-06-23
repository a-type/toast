FROM node:10

WORKDIR /usr/src/app

RUN npm i lerna -g --loglevel notice

COPY package.json package-lock.json ./
RUN npm ci --loglevel notice

COPY services/toast-ui ./services/toast-ui
COPY services/toast-web ./services/toast-web

COPY lerna.json ./
RUN lerna bootstrap

RUN npm --prefix services/toast-ui build

COPY --from=gcr.io/berglas/berglas:latest /bin/berglas /bin/berglas

ENV NODE_ENV production

ENTRYPOINT exec /bin/berglas exec -- npm --prefix services/toast-web start
