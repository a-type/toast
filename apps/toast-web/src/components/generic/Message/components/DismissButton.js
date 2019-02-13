import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';

const Container = styled.div`
  position: absolute;
  right: var(--spacing-sm);
  top: var(--spacing-xs);

  & > *:hover {
    color: var(--color-white);
  }
`;

export default props => (
  <Container>
    <Button icon="delete" {...props} />
  </Container>
);
