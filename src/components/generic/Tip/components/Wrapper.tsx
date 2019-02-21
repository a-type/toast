import styled from 'styled-components';

export default styled.div`
  pointer-events: initial;

  box-shadow: 0 4px 8px 0 #00000080;
  border-radius: var(--border-radius-md);

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
