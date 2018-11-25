import styled from 'styled-components';
import { gridAreas } from 'components/effects';

export default styled<{}, 'div'>('div')`
  display: grid;
  grid-template-areas: 'image' 'details';
  grid-template-rows: 2fr 3fr;
  gap: var(--spacing-lg);

  margin-bottom: var(--spacing-xl);

  @media (min-width: 500px) {
    grid-template-areas: 'image details';
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr;
  }

  ${gridAreas(['image', 'details'])};

  & > *[data-grid-area='image'] {
    height: 15vh;
    width: 15vh;
  }
`;
