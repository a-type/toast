import React, { SFC } from 'react';
import styled from 'styled-components';
import { Icon } from 'components/generic';
import Link, { LinkProps } from 'components/generic/Link';
import { IconName } from 'components/generic/Icon';

const ModdedLink = styled(Link)`
  border-radius: 0;
  width: 100%;
  margin: 0;
  border: 0;
  transition: 0.2s ease all;
  position: relative;
  padding: var(--spacing-md) var(--spacing-lg);

  &:hover {
    background: var(--color-brand-light);
    border: 0;
    z-index: 1;
  }

  &:focus {
    background: var(--color-brand-light);
    border: 0;
    z-index: 1;
  }

  &:active {
    z-index: 1;
  }

  &.link-matching {
    background: var(--color-brand-dark);
    color: var(--color-white);
  }
`;

const SidebarLink: SFC<LinkProps & { label: string; icon: IconName }> = ({
  label,
  icon,
  ...props
}) => (
  <ModdedLink {...props}>
    <Icon name={icon} /> {label}
  </ModdedLink>
);

export default SidebarLink;
