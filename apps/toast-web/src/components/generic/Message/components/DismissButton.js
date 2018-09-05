import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';

const Container = styled.div`
  position: absolute;
  right: var(--spacing-sm);
  top: var(--spacing-xs);
`;

export default props => (
  <Container>
    <Button.Icon name="delete" {...props} />
  </Container>
);