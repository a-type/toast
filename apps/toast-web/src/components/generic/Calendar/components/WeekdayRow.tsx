import styled from 'styled-components';
import { DAY_SIZE } from '../constants';

const WeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  justify-content: space-between;
  align-content: space-between;
  margin-bottom: var(--spacing-md);
`;

export default WeekdayRow;
