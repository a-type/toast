import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import playground from 'graphql-playground-middleware-express';
import { apolloUploadExpress } from 'apollo-upload-server';
import config from 'config';
import schema from './schema';
import { createContext } from './context';
import { info } from 'logger';

const app = express();

app.use(
  '/api',
  bodyParser.json(),
  apolloUploadExpress(),
  graphqlExpress(req => ({ schema, context: createContext(req) }))
);
app.use('/playground', playground({ endpoint: '/api' }));
app.use(express.static('client'));

app.listen(config.port, () => {
  info(`Server ready on http://localhost:${config.port}`);
  info.important(`Playground on http://localhost:${config.port}/playground`);
});
