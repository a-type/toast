import express from 'express';
import 'express-async-errors';
import { scrapeRecipe, parseIngredients, linkRecipe } from './functions';
import ApiError from './ApiError';
import checkIndexes from './checkIndexes';

const app = express();
app.use(express.json());
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

const port = process.env.PORT || 3002;

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/scrapeRecipe', scrapeRecipe);
app.post('/parseIngredients', parseIngredients);
app.post('/linkRecipe', linkRecipe);

app.listen(port, async () => {
  console.info(`Running on http://localhost:${port}`);
  console.info(`Checking indexes...`);
  try {
    await checkIndexes();
    console.info('Indexes checked');
  } catch (err) {
    console.error(err);
  }
});
