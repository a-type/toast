FROM node:9

WORKDIR /app

ADD . .

WORKDIR /app/server

EXPOSE 4040

RUN chown -R 1001:1001 /app

USER 1001

CMD ["npm", "start"]
