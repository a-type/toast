import styled from 'styled-components';
import Box from 'components/generic/Card/Box';

export default styled.div`
  display: flex;
  flex-direction: column;

  & > ${Box} {
    flex: 1;
  }
`;
