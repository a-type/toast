import EventEmitter from 'events';
import decode from 'jwt-decode';

export const AUTH_TOKEN_KEY = 'toast_token';

class AuthTokenStorage extends EventEmitter {
  eventTypes = {
    tokenStored: 'AUTH_TOKEN_STORED',
  };

  constructor() {
    super();
    this.setMaxListeners(100);
  }

  set authToken(token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    this.emit(this.eventTypes.tokenStored, {
      token,
      parsedToken: this.parseToken(),
    });
  }

  get authToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY) || null;
  }

  get httpHeader() {
    return this.authToken ? `Bearer ${this.authToken}` : null;
  }

  get parsedToken() {
    return this.parseToken();
  }

  parseToken = () => {
    return decode(this.authToken);
  };
}

export default new AuthTokenStorage();
