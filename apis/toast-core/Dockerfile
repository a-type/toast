FROM node:9

WORKDIR /app

ADD . .

RUN npm install

RUN npm run build

EXPOSE 4000

RUN chown -R 1001:1001 /app

USER 1001

CMD ["npm", "start"]
