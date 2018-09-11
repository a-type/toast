import React from 'react';
import styled from 'styled-components';
import Foreground from '../Foreground';

const MessageGlobalGroup = styled.div`
  position: fixed;
  bottom: var(--spacing-sm);
  left: var(--spacing-sm);
  right: var(--spacing-sm);
  display: flex;
  flex-direction: column;

  @media (min-width: 720px) {
    left: auto;
    max-width: 300px;
  }
`;

export default props => (
  <Foreground>
    <MessageGlobalGroup {...props} />
  </Foreground>
);
