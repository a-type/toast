import React, { FC } from 'react';
import Link, { LinkProps } from './Link';
import Icon, { GenericIconName } from './Icon';

export interface ActionProps extends LinkProps {
  icon: GenericIconName;
}

export const Action: FC<ActionProps> = ({ children, icon, ...rest }) => {
  return (
    <Link
      {...rest}
      css={{
        borderRadius: '1em',
        background: 'var(--color-brand-light)',
        color: 'var(--color-dark)',
        padding: 'var(--spacing-sm) var(--spacing-lg)',
        cursor: 'pointer',
        '&:focus': {
          boxShadow: '0 0 0 4px var(--color-effect-focus)',
        },
      }}
    >
      {icon && <Icon name={icon} css={{ marginRight: '1em' }} />}
      <span>{children}</span>
    </Link>
  );
};

export default Action;
