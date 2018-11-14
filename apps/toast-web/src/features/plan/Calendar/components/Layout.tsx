import styled, { css } from 'styled-components';
import { gridAreas } from 'components/effects';

const Layout = styled<{ isWide: boolean }, 'div'>('div')`
  display: ${props => (props.isWide ? 'grid' : 'block')};
  grid-template-areas: 'calendar day';
  grid-template-columns: 1fr 2fr;

  ${gridAreas(['calendar', 'day'])} /* auto-hide on mobile */;
`;

export default Layout;
