import * as React from 'react';
import Loader from './Loader';
import styled from 'styled-components';

const GlobalContainer = styled.div`
  position: fixed;
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
  pointer-events: none;
  opacity: 0.5;
`;

export default props => (
  <GlobalContainer {...props}>
    <Loader size="5vw" />
  </GlobalContainer>
);
