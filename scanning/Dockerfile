FROM buildkite/puppeteer:v1.11.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["npm", "start"]
