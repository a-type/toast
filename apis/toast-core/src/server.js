import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import playground from 'graphql-playground-middleware-express';
import config from 'config';
import { typeDefs, resolvers, mocks, directives } from './schema';
import { createContext } from './context';
import { info, warn } from 'logger';
import path from 'path';
import minimist from 'minimist';
import cors from 'cors';
import { path as get } from 'ramda';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

const argv = minimist(process.argv.slice(2));

if (argv.mock) {
  warn.important('USING MOCK DATA');
}

const app = express();

const auth = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${config.auth0.issuer}.well-known/jwks.json`,
  }),
  audience: config.auth0.audience,
  issuer: config.auth0.issuer,
  algorithms: ['RS256'],
  credentialsRequired: false,
});

app.use('/api', auth);

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: directives,
  context: async ({ req }) => {
    const context = await createContext(req);
    return context;
  },
  formatError: error => {
    warn(error);

    if (get(['extensions', 'code'], error) === 'INTERNAL_SERVER_ERROR') {
      error.message = 'Something went wrong on our end. Reloading may help.';
    }

    return error;
  },
  mocks: argv.mock ? mocks : false,
});

apollo.applyMiddleware({ app, path: '/api' });

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
