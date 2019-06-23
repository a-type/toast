FROM node:10

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app/common

COPY ./common/package.json ./common/package-lock.json ./
RUN npm ci
COPY ./common ./

WORKDIR /usr/src/app/scanning

COPY ./scanning/package.json ./scanning/package*.json ./
RUN npm ci

COPY ./scanning ./
RUN npm run build

COPY --from=gcr.io/berglas/berglas:latest /bin/berglas /bin/berglas

ENV NODE_ENV production

ENTRYPOINT exec /bin/berglas exec -- npm start
