declare var CONFIG: {
  auth0: {
    domain: string;
    clientId: string;
    requestedScopes: string[];
    audience: string;
  };
  origin: string;
};

declare var mixpanel: any;

declare module '*.svg' {
  const content: any;
  export default content;
}
