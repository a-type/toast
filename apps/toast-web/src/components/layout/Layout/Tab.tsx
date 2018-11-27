import styled from 'styled-components';

export default styled.button`
  border: 0;
  font-size: var(--font-size-md);
  font-family: var(--font-default);
  background: var(--color-control-background);
  color: var(--color-control-foreground);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md) 0 0 var(--border-radius-md);
  position: fixed;
  right: 0;
  bottom: 2vh;
  z-index: 1000;
  box-shadow: 0 2px 4px 0 var(--color-shadow);

  &:focus {
    outline: none;
  }
`;
