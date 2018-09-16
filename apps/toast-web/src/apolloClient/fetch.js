import auth from 'services/auth';

export default async (uri, options) => {
  let response = await fetch(uri, options);

  if (response.status === 401) {
    console.info('logging out and trying again');
    auth.logout();
    response = await fetch(uri, options);
  }

  return response;
};
