import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { cold } from 'react-hot-loader';
import Context from '../layoutContext';

const Controls: React.SFC<{}> = ({ children }) => {
  const context = React.useContext(Context);
  React.useEffect(() => {
    const uniqueName = `${Math.random()}`;
    context.registerControl(uniqueName, true);

    return () => context.registerControl(uniqueName, false);
  }, []);

  if (context.controlsElement) {
    return ReactDOM.createPortal(children, context.controlsElement);
  }

  return null;
};

export default cold(Controls);
