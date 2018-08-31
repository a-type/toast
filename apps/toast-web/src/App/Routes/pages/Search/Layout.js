import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  grid-template-areas: 'ingredients' 'filters' 'recipes';
  grid-gap: var(--spacing-lg);

  @media (min-width: 1200px) {
    grid-template-areas: 'filters ingredients' 'filters recipes';
    grid-template-columns: minmax(400px, 1fr) 4fr;
  }

  & > *:first-child {
    grid-area: ingredients;
    overflow-x: auto;
  }
  & > *:nth-child(2) {
    grid-area: filters;
  }
  & > *:nth-child(3) {
    grid-area: recipes;
  }
`;

export default Layout;
