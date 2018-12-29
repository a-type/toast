import EventEmitter from 'events';
import history from '../../browserHistory';
import { AuthService } from './types';

export default class MockAuth extends EventEmitter implements AuthService {
  private _isLoggedIn: boolean;

  login = () => {
    this.handleAuthentication();
  };

  clear = () => {
    this._isLoggedIn = false;
  };

  logout = () => {
    this.clear();
    history.replace('/');
  };

  handleAuthentication = () => {
    this._isLoggedIn = true;
    history.replace('/');
  };

  hasScope = (scope: string) => {
    return true;
  };

  get isLoggedIn() {
    return this._isLoggedIn;
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
