import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { CLASS_NAMES } from './constants';
import { Icon } from 'components/generic';

const Banner = styled.div`
  background: var(--color-brand);
  color: var(--color-dark);
  padding: var(--spacing-md);

  display: flex;
  flex-direction: row;

  @media (min-width: 720px) {
    padding: var(--spacing-md) var(--spacing-lg);
    padding-right: var(--spacing-md);
  }

  @media (min-width: 900px) {
    padding: var(--spacing-lg) var(--spacing-xl);
    padding-right: var(--spacing-lg);
  }

  & > .banner-dismiss {
    margin-left: auto;
    cursor: pointer;
    transition: 0.2s ease all;
    color: var(--color-brand-dark);

    &:hover {
      color: var(--color-white);
    }
  }

  & button {
    border-color: var(--color-white);
  }
`;

export default ({ className, children, onDismiss, ...rest }) => (
  <Banner
    className={classnames(CLASS_NAMES.BANNER, CLASS_NAMES.CONTENT, className)}
    {...rest}
  >
    {children}
    <Icon
      size="24px"
      name="delete-button"
      onClick={onDismiss}
      className="banner-dismiss"
    />
  </Banner>
);
