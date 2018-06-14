import styled from 'styled-components';

export default styled.div`
  display: flex;
  height: calc(var(--rhythm) * 2);
  line-height: calc(var(--rhythm) * 2);
  background: var(--color-white);
  color: var(--color-black);
  padding: 0 var(--spacing-md);
  flex-direction: row;

  & > * {
    flex: 0 0 auto;
  }
  & > *:first-child {
    flex: 1;
  }
`;
