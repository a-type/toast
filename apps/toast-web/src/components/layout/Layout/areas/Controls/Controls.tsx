import * as React from 'react';
import Context from '../../../layoutContext';
import * as Components from './components';
import { Button } from 'components/generic';

const Controls = React.forwardRef(({}, ref) => {
  return (
    <Context.Consumer>
      {({
        hasSecondaryContent,
        toggleSecondaryContent,
        secondaryContentIcon,
        isNarrow,
        hasControls,
      }) => {
        if (!hasControls && !(hasSecondaryContent && isNarrow)) {
          return null;
        }

        return (
          <Components.FloatingContainer>
            <Components.ContentRow
              data-controls-portal
              ref={ref as any}
              hasControls={hasControls}
            />
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
});

export default Controls;
