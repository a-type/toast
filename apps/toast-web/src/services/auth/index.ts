import Auth0Service from './Auth0Service';
import Mock from './MockAuthService';
import { AuthService } from './types';

let service: AuthService;
if (CONFIG.mock) {
  service = new Mock();
} else {
  service = new Auth0Service();
}

export default service;
