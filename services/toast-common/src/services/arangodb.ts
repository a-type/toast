import { Database } from 'arangojs';
import { logger } from '../logger';

const host = process.env.ARANGODB_HOST || 'http://localhost:8529';

const arangoDb = new Database({
  url: host,
});
arangoDb.useDatabase(process.env.ARANGODB_DATABASE || 'toast');
const loginPromise = arangoDb.login(
  process.env.ARANGODB_USERNAME || 'toast',
  process.env.ARANGODB_PASSWORD,
);

logger.info(`ArangoDB Connection: ${host}`);

export const getArangoDb = async () => {
  try {
    await loginPromise;
    return arangoDb;
  } catch (err) {
    logger.fatal(`ArangoDB login failure`, err);
    throw err;
  }
};
