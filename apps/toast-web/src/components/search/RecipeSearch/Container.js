import styled from 'styled-components';

export default styled.div`
  transition: 0.5s ease all;
  max-width: 800px;
  width: 100%;

  background: ${props => (props.active ? 'var(--color-white)' : 'transparent')};
`;
