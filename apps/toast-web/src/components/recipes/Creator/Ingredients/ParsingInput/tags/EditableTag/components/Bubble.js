import styled from 'styled-components';

export default styled.div`
  padding: 0 var(--spacing-md);
  transition: 0.2s ease all;
  border-radius: var(--font-size-sm);

  background: ${props =>
    props.empty ? 'transparent' : `var(--color-${props.color})`};
  color: ${props =>
    props.empty ? `var(--color-${props.color})` : 'var(--color-white)'};
  border: 1px ${props => (props.empty ? 'dotted' : 'solid')}
    ${props => `var(--color-${props.color})`};
`;
