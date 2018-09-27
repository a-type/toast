import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'column'};

  & > * {
    margin: auto;
  }
`;
