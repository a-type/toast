import { ManagementClient } from 'auth0';
import config from 'config';

const management = new ManagementClient({
  domain: config.auth0.domain,
  clientId: config.auth0.apiClientId,
  clientSecret: config.auth0.apiClientSecret,
  scope: 'read:users update:users',
});

export default management;
