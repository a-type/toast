import styled from 'styled-components';

export const ShoppingListItemList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: auto;

  & > li {
    margin-bottom: var(--spacing-sm);
  }
`;
