import * as React from 'react';
import styled from 'styled-components';
import { gridAreas } from 'components/effects';

const Content = styled.div`
  display: grid;
  background: var(--color-content-background);
  color: var(--color-content-foreground);

  height: 100%;

  border-radius: var(--border-radius-lg);

  grid-template-areas: 'content' 'controls';
  grid-template-rows: 1fr auto;

  padding: var(--spacing-lg);
  ${gridAreas(['content', 'controls'])};
`;

export default Content;
