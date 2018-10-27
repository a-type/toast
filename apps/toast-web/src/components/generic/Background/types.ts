export interface BackgroundContext {
  hasBackground: boolean;
  register(key: string): void;
  unregister(key: string): void;
}
