import styled from 'styled-components';
import { CardLayoutMode } from '../types';

export const CardBadge = styled.div`
  background: var(--color-positive);
  color: var(--color-white);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-lg);
  margin: auto;
  font-size: var(--font-size-sm);

  [data-card-layout='${CardLayoutMode.Vertical}'] & {
    position: absolute;
    left: var(--spacing-md);
    top: var(--spacing-md);
  }

  [data-card-layout='${CardLayoutMode.Horizontal}'] & {
    position: absolute;
    right: var(--spacing-md);
    top: var(--spacing-md);
  }
`;
