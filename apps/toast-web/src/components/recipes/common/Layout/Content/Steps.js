import styled from 'styled-components';
import contentGridProps from './contentGridProps';
import { withProps } from 'recompose';

export const ID = 'StepsSection';

export default withProps({
  id: ID,
  name: ID,
})(styled.div`
  grid-area: steps;
  ${contentGridProps};
`);
