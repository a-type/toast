import Router from 'next/router';
import nextCookie from 'next-cookies';
import { NextPageContext } from 'next';
import cookie from 'js-cookie';
import firebase from './firebase';

export const getToken = (ctx?: NextPageContext): string | null => {
  if (ctx) {
    const { toastToken } = nextCookie(ctx);
    return toastToken || null;
  } else if (typeof window !== 'undefined') {
    return cookie.get('toastToken') || null;
  }
};

/** redirects an unauthenticated user to the login page, or returns the token */
export const ensureLoggedIn = (ctx: NextPageContext): string | null => {
  const token = getToken(ctx);

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return null;
  }

  if (!token) {
    Router.push('/login');
  }

  return token || null;
};

export const login = (token: string) => {
  cookie.set('toastToken', token, { expires: 1 });
};

export const logout = async () => {
  cookie.remove('toastToken');
  await firebase.auth().signOut();
  Router.push('/');
};
