import styled from 'styled-components';
import { CardLayoutMode } from '../types';

export const CardBadge = styled.div`
  background: var(--color-positive);
  color: var(--color-white);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-sm);
  position: absolute;
  right: var(--spacing-md);
  top: var(--spacing-md);
  z-index: 10;
`;
