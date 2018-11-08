import styled from 'styled-components';
import { gridAreas } from 'components/effects';

export default styled.div`
  padding: var(--spacing-md);
  display: grid;
  grid-template-areas: 'checkbox ingredient' 'checkbox recipes';
  grid-template-rows: repeat(2, auto);
  grid-template-columns: auto 1fr;

  ${gridAreas(['checkbox', 'ingredient', 'recipes'])};
`;
