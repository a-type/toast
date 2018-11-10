import styled from 'styled-components';
import { gridAreas } from 'components/effects';

const Layout = styled.div`
  display: grid;
  grid-template-areas: 'search' 'ingredients' 'filters' 'recipes';
  grid-gap: var(--spacing-lg);
  min-height: 50vh;

  @media (min-width: 1200px) {
    grid-template-areas: 'search search' 'filters ingredients' 'filters recipes';
    grid-template-columns: minmax(400px, 1fr) 4fr;

    & > *[data-grid-area='search'] {
      align-self: flex-start;
      margin-right: auto;
      min-width: 600px;
      max-width: 100%;
    }

    & > *[data-grid-area='filters'] {
      border-right: 2px solid var(--color-gray-lightest);
    }
  }

  @media (min-width: 1600px) {
    grid-template-columns: 1fr 1fr;
  }

  ${gridAreas(['search', 'ingredients', 'filters', 'recipes'])};

  & > *[data-grid-area='ingredients'] {
    overflow-x: auto;
  }
`;

export default Layout;
