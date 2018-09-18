import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  grid-template-areas: 'ingredients' 'filters' 'recipes';
  grid-gap: var(--spacing-lg);
  min-height: 50vh;

  @media (min-width: 1200px) {
    grid-template-areas: 'filters ingredients' 'filters recipes';
    grid-template-columns: minmax(400px, 1fr) 4fr;
  }

  @media (min-width: 1600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

Layout.Ingredients = styled.div`
  grid-area: ingredients;
  overflow-x: auto;
`;

Layout.Filters = styled.div`
  grid-area: filters;
`;

Layout.Recipes = styled.div`
  grid-area: recipes;
`;

export default Layout;
