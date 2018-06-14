import styled from 'styled-components';
import Units from './Item/Units';

export default styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-rows: var(--rhythm);
  grid-gap: var(--rhythm) var(--spacing-sm);
  align-items: baseline;

  & > ${Units} {
    justify-self: end;
  }
`;
