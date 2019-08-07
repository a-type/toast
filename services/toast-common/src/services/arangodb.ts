import { Database, aql } from 'arangojs';
import { logger } from '../logger';
import { AqlLiteral, AqlQuery } from 'arangojs/lib/cjs/aql-query';
import { QueryOptions } from 'arangojs/lib/cjs/database';

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

export const aqlQuery = async (
  query: string | AqlLiteral | AqlQuery,
  bindVars?: any,
  opts?: QueryOptions,
) => {
  const arangoDb = await getArangoDb();
  if (!bindVars && !opts) {
    return arangoDb.query(query);
  }
  return arangoDb.query(query as any, bindVars, opts);
};

export { aql, Database };
