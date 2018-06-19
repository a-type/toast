import styled from 'styled-components';
import { getCss } from 'components/utils/rhythm';

export default styled.h2`
  font-family: var(--font-fancy);
  font-weight: var(--normal);
  font-size: var(--font-size-lg);
  ${props => getCss('lg', props.spacing || { top: 1, bottom: 1 })};
`;
