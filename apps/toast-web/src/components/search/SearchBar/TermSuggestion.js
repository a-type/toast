import styled from 'styled-components';

export default styled.div`
  display: block;
  background: var(--color-brand);
  color: var(--color-white);
  height: calc(var(--rhythm) * 2);
  line-height: calc(var(--rhythm) * 2);
  list-style-type: none;
  padding: 0 var(--spacing-md);
  cursor: pointer;

  &:hover {
    background: var(--color-brand-dark);
  }
`;
