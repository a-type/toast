import styled from 'styled-components';
import { gridAreas } from 'components/effects';

export default styled<{}, 'div'>('div')`
  display: grid;
  grid-template-areas: 'image' 'details';
  grid-template-rows: 200px 3fr;
  gap: var(--spacing-lg);

  & > *[data-grid-area='image'] > *:first-child {
    height: 100%;
  }

  @media (min-width: 500px) {
    grid-template-areas: 'image details';
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr;

    & > *[data-grid-area='image'] > *:first-child {
      height: 15vh;
      width: 15vh;
      margin-bottom: var(--spacing-md);
    }
  }

  ${gridAreas(['image', 'details'])};
`;
