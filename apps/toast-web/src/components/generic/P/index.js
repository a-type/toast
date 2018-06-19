import styled from 'styled-components';

export default styled.p`
  font-size: var(${props => `--font-size-${props.textSize || 'md'}`});
`;
