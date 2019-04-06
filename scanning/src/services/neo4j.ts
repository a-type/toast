import { v1 as neo4j } from 'neo4j-driver';

const driver = neo4j.driver(
  process.env.NEO4J_BOLT_HOST || 'bolt://localhost:7687 ',
  process.env.NEO4J_USERNAME &&
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD),
);

export default driver;
