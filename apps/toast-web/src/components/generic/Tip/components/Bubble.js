import styled from 'styled-components';

export default styled.div`
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: calc(var(--spacing-lg) * 2 + var(--font-size-md));
  border: 1px solid var(--color-brand);
  background: var(--color-white);
  position: relative;

  &[data-placement*='bottom'] {
    margin-top: var(--spacing-md);
  }
  &[data-placement*='top'] {
    margin-bottom: var(--spacing-md);
  }
  &[data-placement*='right'] {
    margin-left: var(--spacing-md);
  }
  &[data-placement*='left'] {
    margin-right: var(--spacing-md);
  }
`;
