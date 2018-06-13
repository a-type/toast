import styled from 'styled-components';
import { getCss } from 'components/utils/rhythm';

export default styled.span`
  font-size: var(${props => `--font-size-${props.textSize || 'md'}`});
  display: block;
  ${props => getCss(props.textSize, props.spacing)};
`;
