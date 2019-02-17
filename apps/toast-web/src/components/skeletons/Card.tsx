import React, { SFC } from 'react';
import styled from 'styled-components';
import { CardShape } from 'components/generic';
import { loading } from 'components/effects';

export const CardSkeletonStyle = styled.div`
  background: var(--color-gray-lightest);
  border-radius: var(--border-radius-md);

  ${loading};
`;

export const CardSkeleton: SFC<{ shape?: CardShape }> = ({ shape }) => (
  <CardSkeletonStyle data-card-shape={shape} />
);
