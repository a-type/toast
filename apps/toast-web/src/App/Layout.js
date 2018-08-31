import styled from 'styled-components';

export default styled.div`
  height: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;

  & > *:first-child {
    flex: 0 0 auto;
  }
`;
