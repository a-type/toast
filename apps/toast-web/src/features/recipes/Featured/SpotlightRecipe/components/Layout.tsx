import styled from 'styled-components';
import { gridAreas } from 'components/effects';

export default styled<{}, 'div'>('div')`
  display: grid;
  grid-template-areas: 'image' 'details';
  grid-template-rows: 2fr 3fr;
  gap: var(--spacing-lg);

  margin-bottom: var(--spacing-xl);

  ${gridAreas(['image', 'details'])}

  @media(min-width: 768px) {
    grid-template-areas: 'image details';
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 3fr;
  }
`;
