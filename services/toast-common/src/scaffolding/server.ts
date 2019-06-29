import express, { RequestHandler } from 'express';
import 'express-async-errors';
import { ApiError } from './errors';

export type Route = {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
  handler: RequestHandler;
};

export const server = (routes: Route[], config: { defaultPort: number }) => {
  const app = express();
  // adds the raw, unparsed body to 'rawBody' on req
  app.use(
    express.json({
      verify: (req, res, buf) => {
        req['rawBody'] = buf.toString();
      },
    }),
  );
  app.use((err, req, res, next) => {
    console.error(err);
    if (res.headersSent) {
      return next(err);
    }

    if (err instanceof ApiError) {
      return res.status(err.status).send(err.message);
    }
    return res.status(500).send('Internal error');
  });

  const port = process.env.PORT || config.defaultPort || 8080;

  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  routes.forEach(route => {
    app[route.method](route.path, route.handler);
  });

  return new Promise(resolve => {
    app.listen(port, async () => {
      console.info(`Running on http://localhost:${port}`);
      resolve(app);
    });
  });
};
