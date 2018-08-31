import React from 'react';
import styled from 'styled-components';
import { Link, Button } from 'components/generic';

export const CardContainer = styled.div`
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  background: var(--color-gray-lightest);
  min-width: 5vw;

  & > *:first-child {
    flex: 1;
  }
`;

const ControlGroup = styled(Button.Group)`
  & button {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

const Name = styled.div`
  padding: var(--spacing-sm);
  cursor: pointer;
  overflow: hidden;
`;

export default ({ ingredient, include, exclude }) => (
  <CardContainer>
    <Link.Clear to={`/ingredients/${ingredient.id}`}>
      <Name>{ingredient.name}</Name>
    </Link.Clear>
    <ControlGroup>
      <Button.Positive onClick={include}>+</Button.Positive>
      <Button.Negative onClick={exclude}>&times;</Button.Negative>
    </ControlGroup>
  </CardContainer>
);
