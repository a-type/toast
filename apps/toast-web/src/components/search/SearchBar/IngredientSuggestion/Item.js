import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-gap: var(--spacing-sm);
  height: calc(var(--rhythm) * 2);
  line-height: calc(var(--rhythm) * 2);
  background: var(--color-white);
  color: var(--color-black);
  padding: 0 var(--spacing-md);
  flex-direction: row;
`;
