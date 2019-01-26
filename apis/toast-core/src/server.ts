import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import config from 'config';
import { typeDefs, resolvers, mocks, directives } from './schema';
import { createContext } from './context';
import { info, warn } from 'logger';
import path from 'path';
import minimist from 'minimist';
import cors from 'cors';
import { path as get } from 'ramda';
import mockAuthMiddleware from 'mocks/mockAuthMiddleware';
import firebase from 'services/firebase';

const argv = minimist(process.argv.slice(2));

if (argv.mock) {
  warn.important('USING MOCK DATA');
}

const app = express();

if (argv.mock) {
  app.use('/api', mockAuthMiddleware);
} else {
  app.use('/api', async (req, res, next) => {
    const token =
      req.headers.authorization &&
      req.headers.authorization.replace('Bearer ', '');
    if (!token) {
      next();
      return;
    }

    const decoded = await firebase.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  });
}

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
