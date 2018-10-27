import { createContext } from 'react';
import { BackgroundContext } from './types';

export default createContext<BackgroundContext>({
  hasBackground: false,
  register: () => {},
  unregister: () => {},
});
