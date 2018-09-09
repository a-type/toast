import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { CLASS_NAMES } from './constants';

const Banner = styled.div`
  background: var(--color-brand);
  color: var(--color-white);
  padding: var(--spacing-md);

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 720px) {
    padding: var(--spacing-lg);
  }

  @media (min-width: 900px) {
    padding: var(--spacing-xl);
  }
`;

export default ({ className, ...rest }) => (
  <Banner className={classnames(CLASS_NAMES.BANNER, className)} {...rest} />
);
