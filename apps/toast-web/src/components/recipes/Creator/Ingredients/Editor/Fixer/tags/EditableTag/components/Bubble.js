import styled from 'styled-components';

export default styled.span`
  padding: 0 var(--spacing-md);
  transition: 0.2s ease all;
  border-radius: var(--font-size-sm);
  display: inline-block;
  cursor: pointer;

  background: ${props => `var(--color-${props.color}-highlighter)`};
  color: ${props => `var(--color-${props.color}-dark)`};
  border: 1px dotted ${props => `var(--color-${props.color}-dark)`};
`;
