import styled from 'styled-components';

export default styled.div`
  display: inline-block;
  background-color: ${props => `var(--color-${props.color}-light)`};
  color: inherit;
  position: relative;
  cursor: pointer;
`;
