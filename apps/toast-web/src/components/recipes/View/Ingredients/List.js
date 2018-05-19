import styled from 'styled-components';
import Units from './Item/Units';

export default styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  align-items: baseline;

  & > ${Units} {
    justify-self: end;
  }
`;
