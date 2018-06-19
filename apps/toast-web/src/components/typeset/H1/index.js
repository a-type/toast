import styled from 'styled-components';
import { getCss } from 'components/utils/rhythm';

export default styled.h1`
  font-family: var(--font-fancy);
  font-weight: var(--normal);
  font-size: var(--font-size-xl);
  ${props => getCss('xl', props.spacing || { bottom: 1 })};
`;