import express from 'express';
import config from 'config';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: config.origin,
  }),
);

app.use(express.static(path.resolve(__dirname, '../../dist')));
app.use((req, res) =>
  res.sendFile(path.resolve(__dirname, '../../dist/index.html')),
);

app.listen(config.port, () => {
  console.info(`Server ready on http://localhost:${config.port}`);
});
