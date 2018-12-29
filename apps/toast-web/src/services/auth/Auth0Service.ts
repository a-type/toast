import auth0 from 'auth0-js';
import EventEmitter from 'events';
import history from '../../browserHistory';
import jwt from 'jwt-decode';
import apolloClient from 'apolloClient';
import gql from 'graphql-tag';
import { AuthService, AuthUser, AuthToken, AuthEventType } from './types';
import {
  ACCESS_TOKEN_KEY,
  ID_TOKEN_KEY,
  EXPIRES_AT_KEY,
  SCOPES_KEY,
} from './constants';

const MergeUser = gql`
  mutation MergeUser {
    mergeUser {
      id
      name
      email
    }
  }
`;

export default class Auth0Service extends EventEmitter implements AuthService {
  auth0 = new auth0.WebAuth({
    domain: CONFIG.auth0.domain,
    clientID: CONFIG.auth0.clientId,
    redirectUri: CONFIG.origin + '/loggedIn',
    responseType: 'token id_token',
    scope: 'openid profile email ' + CONFIG.auth0.requestedScopes.join(' '),
    audience: CONFIG.auth0.audience,
  });

  renewalTimeout = null;

  constructor() {
    super();
    this.setMaxListeners(100);
    this.scheduleRenewal();
  }

  login = () => {
    this.auth0.authorize();
    mixpanel.track('login');
  };

  clear = () => {
    localStorage.removeItem(ID_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(EXPIRES_AT_KEY);
    localStorage.removeItem(SCOPES_KEY);
    clearTimeout(this.renewalTimeout);
    this.emit(AuthEventType.TokenStored);
  };

  logout = () => {
    this.clear();
    mixpanel.track('logout');
    this.auth0.logout({
      returnTo: window.location.origin + '/',
    });
    history.replace('/');
  };

  handleAuthentication = () => {
    this.auth0.parseHash(async (err, result) => {
      if (result && result.accessToken && result.idToken) {
        this.setSession(result);

        // create or merge user
        await apolloClient.mutate({
          mutation: MergeUser,
        });

        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.error(err);
        // TODO: show error alert
      }
    });
  };

  private setSession = authResult => {
    console.log(authResult);
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime(),
    );
    localStorage.setItem(ID_TOKEN_KEY, authResult.idToken);
    localStorage.setItem(ACCESS_TOKEN_KEY, authResult.accessToken);
    localStorage.setItem(EXPIRES_AT_KEY, expiresAt);
    localStorage.setItem(
      SCOPES_KEY,
      authResult.scope || CONFIG.auth0.requestedScopes.join(' '),
    );

    this.scheduleRenewal();

    this.emit(AuthEventType.TokenStored);
  };

  private renewToken = () => {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.info('Session renewed');
        this.setSession(result);
      }
    });
  };

  private scheduleRenewal = () => {
    const expiresAt = JSON.parse(localStorage.getItem(EXPIRES_AT_KEY));
    const delay = expiresAt - Date.now();
    if (delay > 0) {
      this.renewalTimeout = setTimeout(() => {
        this.renewToken();
      }, delay);
    } else {
      this.clear();
      this.emit(AuthEventType.TokenExpired);
    }
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
    return this.isLoggedIn && this.accessToken
      ? `Bearer ${this.accessToken}`
      : null;
  }

  get user(): AuthUser {
    if (!this.idToken) return null;
    const user = jwt(this.idToken) as AuthToken;
    (user as AuthUser).id = user.sub;
    return user as AuthUser;
  }

  get scopes() {
    const scopeString = localStorage.getItem(SCOPES_KEY);
    if (scopeString) {
      return scopeString.split(' ');
    }
    return [];
  }

  hasScope = (scope: string) => {
    return this.scopes.includes(scope);
  };
}
