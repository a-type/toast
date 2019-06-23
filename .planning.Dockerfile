FROM node:10

WORKDIR /usr/src/app

RUN npm i lerna -g --loglevel notice

COPY package.json package-lock.json ./
RUN npm ci --loglevel notice

COPY services/toast-common ./services/toast-common
COPY services/toast-planning ./services/toast-planning

COPY lerna.json ./
RUN lerna bootstrap
RUN lerna run ci:build

COPY --from=gcr.io/berglas/berglas:latest /bin/berglas /bin/berglas

ENV NODE_ENV production

ENTRYPOINT exec /bin/berglas exec -- npm --prefix services/toast-planning start
