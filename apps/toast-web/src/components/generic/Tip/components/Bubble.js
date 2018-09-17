import styled from 'styled-components';

export default styled.div`
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 18px;
  background: var(--color-white);
  position: relative;
  pointer-events: initial;

  box-shadow: 0 4px 8px 0 #00000080;

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
