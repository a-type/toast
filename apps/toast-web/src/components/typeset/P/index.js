import styled from 'styled-components';
import { getCss } from 'components/utils/rhythm';

export default styled.p`
  font-size: var(${props => `--font-size-${props.textSize || 'md'}`});
  ${props => getCss(props.textSize, props.spacing)};
`;
