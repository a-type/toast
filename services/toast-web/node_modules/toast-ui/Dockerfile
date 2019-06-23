FROM node:10

WORKDIR /usr/src/app

COPY . ./

WORKDIR /usr/src/app/server
RUN npm ci

RUN npm run build

COPY --from=gcr.io/berglas/berglas:latest /bin/berglas /bin/berglas

ENV NODE_ENV production

ENTRYPOINT exec /bin/berglas exec -- npm start
