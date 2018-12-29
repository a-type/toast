import EventEmitter from 'events';
import history from '../../browserHistory';
import { AuthService, AuthEventType } from './types';

const STORAGE_KEY = 'toast_mock_loggedin';

export default class MockAuth extends EventEmitter implements AuthService {
  login = () => {
    this.handleAuthentication();
  };

  clear = () => {
    sessionStorage.setItem(STORAGE_KEY, 'false');
    this.emit(AuthEventType.TokenStored);
  };

  logout = () => {
    this.clear();
    history.replace('/');
  };

  handleAuthentication = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    history.replace('/');
    this.emit(AuthEventType.TokenStored);
  };

  hasScope = (scope: string) => {
    return true;
  };

  get isLoggedIn() {
    const val = sessionStorage.getItem(STORAGE_KEY);
    return val && val === 'true';
  }

  get idToken() {
    return this.isLoggedIn ? 'MOCK_ID_TOKEN' : null;
  }

  get accessToken() {
    return this.isLoggedIn ? 'MOCK_ACCESS_TOKEN' : null;
  }

  get httpHeader() {
    return this.isLoggedIn ? 'Bearer MOCK_ACCESS_TOKEN' : null;
  }

  get user() {
    if (!this.isLoggedIn) {
      return null;
    }

    return {
      sub: 'fake_id',
      id: 'fake_id',
      picture: null,
    };
  }
}
