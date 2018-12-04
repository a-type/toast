import * as React from 'react';
import styled from 'styled-components';
import Icon from 'components/generic/Icon';

const ExpandOuterButton = styled.button`
  background: var(--color-white);
  width: 100%;
  padding: var(--spacing-sm);
  padding-top: var(--spacing-md);
  border-radius: 0 0 var(--border-radius-md) var(--border-radius-md);
  margin-bottom: var(--spacing-lg);
  border: 2px solid transparent;
  border-top: 0;

  transition: 0.2s ease all;

  &:focus {
    outline: 0;
    border-color: var(--color-brand);
  }
`;

const ExpandButton = props => (
  <ExpandOuterButton {...props}>
    <Icon name="expand-arrow" rotation={props.expanded ? 180 : 0} />
  </ExpandOuterButton>
);

export default ExpandButton;
