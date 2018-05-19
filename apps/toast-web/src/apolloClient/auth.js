export const AUTH_TOKEN_KEY = 'toast_token';

export const authTokenHeader = () =>
  localStorage.getItem(AUTH_TOKEN_KEY)
    ? `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
    : null;

export const storeAuthToken = token =>
  localStorage.setItem(AUTH_TOKEN_KEY, token);

export default authTokenHeader;
