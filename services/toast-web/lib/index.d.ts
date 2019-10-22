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
