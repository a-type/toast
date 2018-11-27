import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'components/generic';
import { focusShadow } from 'components/effects';

export default styled(Link)`
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  transition: 0.2s ease all;

  &:hover {
    background: var(--color-gray-lightest);
    box-shadow: ${focusShadow('gray-lightest')};
  }
`;
