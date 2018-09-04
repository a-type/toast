import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/generic';
import { Link } from 'components/typeset';

export const CardContainer = styled.div`
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: row;
  background: var(--color-gray-lightest);
  min-width: 5vw;

  & > *:first-child {
    flex: 1;
  }
`;

const ControlGroup = styled(Button.Group)`
  & button:first-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const Name = styled.div`
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  overflow: hidden;
  text-transform: capitalize;
`;

export default ({ ingredient, include, exclude, ...rest }) => (
  <CardContainer {...rest}>
    <Link.Clear to={`/ingredients/${ingredient.id}`}>
      <Name>{ingredient.name}</Name>
    </Link.Clear>
    <ControlGroup>
      <Button.Positive onClick={include}>+</Button.Positive>
      <Button.Negative onClick={exclude}>&times;</Button.Negative>
    </ControlGroup>
  </CardContainer>
);
