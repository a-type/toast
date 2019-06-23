import firebase from 'services/firebase';

export default async (uri: RequestInfo, options: RequestInit) => {
  let response = await fetch(uri, options);

  if (response.status === 401) {
    console.info('logging out and trying again');
    await firebase.auth().signOut();
    response = await fetch(uri, options);
  }

  return response;
};
