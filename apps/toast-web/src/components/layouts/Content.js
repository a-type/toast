import React from 'react';
import classnames from 'classnames';
import { CLASS_NAMES } from './constants';
import styled from 'styled-components';
import { Background } from '../generic';

const BaseContentStyles = styled.div`
  background: var(--color-content-background);
  color: var(--color-content-foreground);
  padding: ${props => (props.hasBackground ? 'var(--spacing-md)' : '0')};

  @media (min-width: 900px) {
    padding: ${props => (props.hasBackground ? 'var(--spacing-xl)' : '0')};
  }
`;

/**
 * A special Content style designed to overlay a primary-colored background
 */
BaseContentStyles.Overlay = styled(BaseContentStyles)`
  --color-content-foreground: var(--color-white);
  --color-content-background: #ab5f0f70;
  --color-heading: var(--color-white);
  --color-field-background: var(--color-brand-dark);
  --color-field-foreground: var(--color-white);
`;

export default ({ className, mode = 'default', ...rest }) => {
  const ContentStyles =
    mode === 'overlay' ? BaseContentStyles.Overlay : BaseContentStyles;
  return (
    <Background.Consumer>
      {({ hasBackground }) => (
        <ContentStyles
          hasBackground={hasBackground}
          className={classnames(className, CLASS_NAMES.CONTENT)}
          {...rest}
        />
      )}
    </Background.Consumer>
  );
};
