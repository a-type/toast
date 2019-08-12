import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import config from 'config';
import { createContext } from './context';
import { logger } from 'toast-common';
import minimist from 'minimist';
import { path as get } from 'ramda';
import mockAuthMiddleware from 'mocks/mockAuthMiddleware';
import firebase from 'services/firebase';
import cors from 'cors';
import resolvers from './resolvers';
import * as directives from './directives';
import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';
import typeDefs from './schema/schema';

const argv = minimist(process.argv.slice(2));

const app = express();

logger.info(`Allowed origins: `, JSON.stringify(config.cors.allowedOrigins));

const corsMiddleware = cors({
  origin: config.cors.allowedOrigins,
  credentials: true,
});

app.options('*', corsMiddleware);
app.use(corsMiddleware);

if (argv.mock) {
  app.use('/api', mockAuthMiddleware);
} else {
  app.use('/api', async (req, res, next) => {
    try {
      const token =
        req.headers.authorization &&
        req.headers.authorization.replace('Bearer ', '');
      if (!token) {
        next();
        return;
      }

      const decoded = await firebase.auth().verifyIdToken(token);
      req.user = decoded;
    } catch (err) {
      logger.fatal(err);
    }
    next();
  });
}

/**
 * Liveness probe endpoint so that k8s and other services can confirm
 * that the server is running and serving requests
 */
app.get('/ping', (req, res) => {
  res.send('pong');
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as any,
  schemaDirectives: {
    ...directives,
  },
});

const apollo = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const context = await createContext(req);
    return context;
  },
  formatError: error => {
    logger.warn(error);

    if (get(['extensions', 'code'], error) === 'INTERNAL_SERVER_ERROR') {
      error.message = 'Something went wrong on our end. Reloading may help.';
    }

    return error;
  },
});

apollo.applyMiddleware({ app, path: '/api', cors: false });

app.listen(config.port, () => {
  logger.info(`Server ready on http://localhost:${config.port}`);
  logger.info.important(
    `Playground on http://localhost:${config.port}/playground`,
  );
});
