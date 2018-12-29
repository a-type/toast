import { EventEmitter } from 'events';

export interface AuthToken {
  sub: string;
}

export interface AuthUser extends AuthToken {
  id: string;
  picture: string;
}

export interface AuthService extends EventEmitter {
  login(): void;
  clear(): void;
  logout(): void;
  handleAuthentication(): void;
  hasScope(scope: string): boolean;

  isLoggedIn: boolean;
  idToken: string;
  accessToken: string;
  httpHeader: string;
  user: AuthUser;
}

export enum AuthEventType {
  TokenStored = 'AUTH_TOKEN_STORED',
  TokenExpired = 'AUTH_TOKEN_EXPIRED',
}
