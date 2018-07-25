import styled from 'styled-components';
import contentGridProps from './contentGridProps';
import { withProps } from 'recompose';

export const ID = 'IngredientsSection';

export default withProps({
  id: ID,
  name: ID,
})(styled.div`
  grid-area: ingredients;
  ${contentGridProps};
`);
