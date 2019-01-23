import { ManagementClient } from 'auth0';
import config from 'config';
import mockManagement from './mock';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

let management;

if (argv.mock) {
  management = mockManagement;
} else {
  management = new ManagementClient({
    domain: config.auth0.domain,
    clientId: config.auth0.apiClientId,
    clientSecret: config.auth0.apiClientSecret,
    scope: 'read:users update:users',
  });
}

export default management as ManagementClient;
