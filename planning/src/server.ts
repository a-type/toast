import express from 'express';
import 'express-async-errors';
import { syncPlan, syncAll } from './functions';
import ApiError from './ApiError';

const app = express();
app.use(express.json());
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ApiError) {
    return res.status(err.status).send(err.message);
  }
  return res.status(500).send('Internal error');
});

const port = process.env.PORT || 3001;

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/syncPlan', syncPlan);
app.post('/syncAll', syncAll);

app.listen(port, () => console.info(`Running on http://localhost:${port}`));
