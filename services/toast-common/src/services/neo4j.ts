import { v1 } from 'neo4j-driver';
import { logger } from '../logger';

const host = process.env.NEO4J_BOLT_HOST || 'bolt://localhost:7687';

export const neo4j = v1.driver(
  host,
  process.env.NEO4J_PASSWORD &&
    v1.auth.basic(
      process.env.NEO4J_USERNAME || 'neo4j',
      process.env.NEO4J_PASSWORD,
    ),
  {
    disableLosslessIntegers: true,
    logging: {
      level: 'warn',
      logger: (level, message) =>
        console.log(`${Date.now()} ${level.toUpperCase()} ${message}`),
    },
  },
);

logger.info(`Neo4j Connection: `, host);

export const neo4jTimestamp = (date = new Date()) =>
  new (v1.types.DateTime as any)(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDay() + 1,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds() * 1000000,
    date.getTimezoneOffset() * 60,
  ) as any;
