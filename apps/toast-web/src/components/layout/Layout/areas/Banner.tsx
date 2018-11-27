import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { CLASS_NAMES } from '../../constants';
import { Icon } from 'components/generic';
import { BackdropArt } from 'components/brand';

const BannerStyles = styled.div`
  background: transparent;
  color: var(--color-dark);
  padding: var(--spacing-md);
  position: relative;
  height: auto;

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

export interface BannerProps {
  className?: string;
  children: React.ReactNode;
  onDismiss?(): void;
}

const Banner: React.SFC<BannerProps> = ({
  className,
  children,
  onDismiss,
  ...rest
}) => (
  <BannerStyles className={classnames(CLASS_NAMES.BANNER, className)} {...rest}>
    {children}
    {onDismiss && (
      <Icon
        size="24px"
        name="delete-button"
        onClick={onDismiss}
        className="banner-dismiss"
      />
    )}
    <BackdropArt />
  </BannerStyles>
);

export default Banner;
