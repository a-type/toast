import styled, { css } from 'styled-components';
import { CardLayoutMode } from '../types';

export const compact = css``;

export const vertical = css``;

export const horizontal = css``;

export const CardContents = styled.div`
  background: var(--color-content-background);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 20%;

  &[data-card-layout='${CardLayoutMode.Compact}'] {
    ${compact}
  }

  &[data-card-layout='${CardLayoutMode.Horizontal}'] {
    ${horizontal}
  }

  &[data-card-layout='${CardLayoutMode.Vertical}'] {
    ${vertical}
  }
`;
