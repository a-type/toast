FROM node:10

WORKDIR /usr/src/app

COPY package.json package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

COPY --from=gcr.io/berglas/berglas:latest /bin/berglas /bin/berglas

ENV NODE_ENV production

ENTRYPOINT exec /bin/berglas exec -- npm start
