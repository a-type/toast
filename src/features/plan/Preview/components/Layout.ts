import styled from 'styled-components';
import { gridAreas } from 'components/effects';

export default styled.div`
  display: grid;
  grid-template-areas: 'label label' 'breakfast dinner' 'lunch dinner';
  grid-template-rows: auto 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-sm);

  margin-bottom: var(--spacing-lg);

  ${gridAreas(['label', 'breakfast', 'lunch', 'dinner'])};
`;
