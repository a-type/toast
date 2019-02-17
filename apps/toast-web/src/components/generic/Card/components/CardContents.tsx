import styled, { css } from 'styled-components';

const commonStyles = css`
  background: var(--color-content-background);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
`;

export const CompactCardContents = styled.div`
  ${commonStyles} width: 100%;
  height: 100%;
`;

export const VerticalCardContents = styled.div`
  ${commonStyles} position: absolute;
  top: auto;
  bottom: 2px;
  height: auto;
  max-height: 60%;
  left: 2px;
  right: 2px;
`;

export const HorizontalCardContents = styled.div`
  ${commonStyles} position: absolute;
  left: 2px;
  right: auto;
  top: 2px;
  bottom: 2px;
  max-width: 75%;
`;
