import styled from 'styled-components';

export default styled.span`
  font-size: var(${props => `--font-size-${props.textSize || 'md'}`});
`;
