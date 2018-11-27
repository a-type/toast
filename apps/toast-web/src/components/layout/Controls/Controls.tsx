import * as React from 'react';
import Context from '../layoutContext';
import * as Components from './components';
import { Button } from 'components/generic';

const Controls: React.SFC<{}> = ({ children }) => {
  return (
    <Context.Consumer>
      {({
        hasSecondaryContent,
        toggleSecondaryContent,
        secondaryContentIcon,
        isNarrow,
      }) => {
        return (
          <Components.FloatingContainer>
            <Components.ContentRow>{children}</Components.ContentRow>
            {hasSecondaryContent &&
              isNarrow && (
                <Button.Icon
                  name={secondaryContentIcon}
                  onClick={toggleSecondaryContent}
                />
              )}
          </Components.FloatingContainer>
        );
      }}
    </Context.Consumer>
  );
};

export default Controls;
