import React from 'react';
import classnames from 'classnames';
import { CLASS_NAMES } from './constants';
import styled from 'styled-components';
import { Background } from '../generic';

const Content = styled.div`
  background: var(--color-white);
  padding: ${props => (props.hasBackground ? 'var(--spacing-md)' : '0')};

  @media (min-width: 900px) {
    padding: ${props => (props.hasBackground ? 'var(--spacing-xl)' : '0')};
  }
`;

export default ({ className, ...rest }) => (
  <Background.Consumer>
    {({ hasBackground }) => (
      <Content
        hasBackground={hasBackground}
        className={classnames(className, CLASS_NAMES.CONTENT)}
        {...rest}
      />
    )}
  </Background.Consumer>
);
