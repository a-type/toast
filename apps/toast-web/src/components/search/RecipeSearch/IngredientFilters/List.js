import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;

  & > * {
    margin: 5px 5px 0 0;
  }
`;
