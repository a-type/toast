declare var CONFIG: {
  auth0: {
    domain: string;
    clientId: string;
    requestedScopes: string[];
    audience: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    databaseUrl: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
  };
  pushCertPublicKey: string;
  origin: string;
  apiHost: string;
  mock: boolean;
  stripe: {
    key: string;
    planId: string;
  };
};

declare var mixpanel: any;

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.json' {
  const content: any;
  export default content;
}

declare module '*.ico' {
  const content: string;
  export default content;
}
