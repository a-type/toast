import styled from 'styled-components';

export default styled.div`
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: calc(var(--spacing-md) * 2 + var(--font-size-md));
  border: 1px solid var(--color-brand);
  background: var(--color-white);
  position: relative;

  &[data-placement*='bottom'] {
    margin-top: var(--spacing-sm);
  }
  &[data-placement*='top'] {
    margin-bottom: var(--spacing-sm);
  }
  &[data-placement*='right'] {
    margin-left: var(--spacing-sm);
  }
  &[data-placement*='left'] {
    margin-right: var(--spacing-sm);
  }
`;