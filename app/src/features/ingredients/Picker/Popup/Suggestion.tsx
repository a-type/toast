import styled from 'styled-components';

export default styled<{ active?: boolean }, 'div'>('div')`
  padding: var(--spacing-lg) var(--spacing-md);
  cursor: pointer;
  text-transform: capitalize;
  color: ${props =>
    props.active ? 'var(--color-brand)' : 'var(--color-black)'};
  border-bottom: 1px solid var(--color-gray-lightest);

  &:hover,
  &:focus {
    color: var(--color-brand);
  }
`;
