import auth0 from 'auth0-js';
import EventEmitter from 'events';
import history from '../browserHistory';
import jwt from 'jwt-decode';
import apolloClient from 'apolloClient';
import gql from 'graphql-tag';

export const ACCESS_TOKEN_KEY = 'toast_access_token';
export const ID_TOKEN_KEY = 'toast_id_token';
export const EXPIRES_AT_KEY = 'toast_expires_at';

const MergeUser = gql`
  mutation MergeUser {
    mergeUser {
      id
      name
      email
    }
  }
`;

export class Auth extends EventEmitter {
  auth0 = new auth0.WebAuth({
    domain: CONFIG.auth0.domain,
    clientID: CONFIG.auth0.clientId,
    redirectUri: CONFIG.origin + '/loggedIn',
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  eventTypes = {
    tokenStored: 'AUTH_TOKEN_STORED',
  };

  constructor() {
    super();
    this.setMaxListeners(100);
  }

  login = () => {
    this.auth0.authorize();
  };

  logout = () => {
    localStorage.removeItem(ID_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(EXPIRES_AT_KEY);
    this.emit(this.eventTypes.tokenStored);
    history.replace('/');
  };

  handleAuthentication = () => {
    this.auth0.parseHash(async (err, result) => {
      if (result && result.accessToken && result.idToken) {
        this.setSession(result);

        console.info('Looking up backend user');
        // create or merge user
        await apolloClient.mutate({
          mutation: MergeUser,
        });

        console.info('done');

        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.error(err);
        // TODO: show error alert
      }
    });
  };

  setSession = authResult => {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime(),
    );
    localStorage.setItem(ID_TOKEN_KEY, authResult.idToken);
    localStorage.setItem(ACCESS_TOKEN_KEY, authResult.accessToken);
    localStorage.setItem(EXPIRES_AT_KEY, expiresAt);
    this.emit(this.eventTypes.tokenStored);
  };

  get isLoggedIn() {
    const expiresAt = JSON.parse(localStorage.getItem(EXPIRES_AT_KEY));
    return new Date().getTime() < expiresAt;
  }

  get idToken() {
    return localStorage.getItem(ID_TOKEN_KEY) || null;
  }

  get accessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || null;
  }

  get httpHeader() {
    return this.idToken ? `Bearer ${this.idToken}` : null;
  }

  get user() {
    return this.idToken ? jwt(this.idToken) : null;
  }
}

export default new Auth();
