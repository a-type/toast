import * as React from 'react';
import styled from 'styled-components';
import Icon from 'components/generic/Icon';

const ExpandOuterButton = styled.button`
  border: 0;
  background: var(--color-white);
  width: 100%;
  padding: var(--spacing-sm);
  border-radius: 0 0 var(--border-radius-md) var(--border-radius-md);
  box-shadow: 0 6px 16px 0 var(--color-shadow);
  margin-bottom: var(--spacing-lg);

  transition: 0.2s ease all;

  &:focus {
    outline: 0;
    background: var(--color-gray-lightest);
  }
`;

const ExpandButton = props => (
  <ExpandOuterButton {...props}>
    <Icon name="expand-arrow" rotation={props.expanded ? 180 : 0} />
  </ExpandOuterButton>
);

export default ExpandButton;
