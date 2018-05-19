import styled from 'styled-components';

export default styled.div`
  transition: 0.5s ease all;

  border-style: solid;
  border-width: 1px;
  border-color: ${props =>
    props.active ? 'var(--color-black)' : 'transparent'};
  background: ${props => (props.active ? 'var(--color-white)' : 'transparent')};
  border-top: 0;
`;
