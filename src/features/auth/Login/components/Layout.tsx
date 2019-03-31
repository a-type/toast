import styled from 'styled-components';

const Layout = styled<{}, 'div'>('div')`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  row-gap: var(--spacing-lg);

  & > * {
    margin: auto;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;

    & > * {
      padding: var(--spacing-lg);
    }

    & > *:first-child {
      border-right: 2px solid var(--color-gray-lightest);
    }
  }
`;

export default Layout;
