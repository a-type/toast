import * as React from 'react';
import { ContentArea, LayoutContext } from './types';

const Context = React.createContext<LayoutContext>({
  activeContents: new Set<ContentArea>(['main']),
  setActiveContent: () => {},
});

export default Context;

export interface LayoutContextProviderProps {
  children: React.ReactNode;
}
