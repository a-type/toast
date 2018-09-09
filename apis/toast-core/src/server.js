import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import playground from 'graphql-playground-middleware-express';
import { apolloUploadExpress } from 'apollo-upload-server';
import config from 'config';
import schema from './schema';
import { createContext } from './context';
import { info, warn } from 'logger';
import path from 'path';
import minimist from 'minimist';
import cors from 'cors';

const argv = minimist(process.argv.slice(2));

if (argv.mock) {
  warn.important('USING MOCK DATA');
}

const app = express();

app.use(
  '/api',
  bodyParser.json(),
  apolloUploadExpress(),
  graphqlExpress(async req => {
    const context = await createContext(req);
    return { schema, context };
  }),
);
app.use('/playground', playground({ endpoint: '/api' }));
app.use('/bookmarklet/toast-bookmarklet.js', cors(), (req, res) =>
  res.sendFile(
    path.join(process.cwd(), 'client/bookmarklet/toast-bookmarklet.js'),
  ),
);
app.use(express.static('client'));
app.use((req, res) =>
  res.sendFile(path.join(process.cwd(), 'client/index.html')),
);

app.listen(config.port, () => {
  info(`Server ready on http://localhost:${config.port}`);
  info.important(`Playground on http://localhost:${config.port}/playground`);
});
