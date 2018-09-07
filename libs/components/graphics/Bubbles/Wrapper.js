import styled from 'styled-components';

export default styled.div`
  background-color: ${props => `var(--color-${props.backgroundColor})`};
  overflow: hidden;
  position: relative;
  padding: 10px;
`;
