import * as React from 'react';
import { LayoutContext } from './types';

const Context = React.createContext<LayoutContext>({
  secondaryContentHidden: false,
  hasSecondaryContent: false,
  hasControls: false,
  isNarrow: false,
  secondaryContentIcon: 'three-dots-symbol',
  toggleSecondaryContent: () => {},
  registerControl: () => {},
  controlsElement: null,
});

export default Context;
