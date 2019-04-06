import styled, { css } from 'styled-components';
import { CardLayoutMode } from '../types';

export const compact = css`
  width: 100%;
  height: 100%;
`;

export const vertical = css`
  position: absolute;
  top: auto;
  bottom: 2px;
  height: auto;
  max-height: 60%;
  min-height: 20%;
  left: 2px;
  right: 2px;
`;

export const horizontal = css`
  position: absolute;
  left: 2px;
  right: auto;
  top: 2px;
  bottom: 2px;
  max-width: 75%;
  min-width: 40%;
`;

export const CardContents = styled.div`
  background: var(--color-content-background);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;

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
