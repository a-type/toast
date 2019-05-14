import React, { FC } from 'react';
import Link, { LinkProps } from 'components/generic/Link';
import Icon, { GenericIconName } from 'components/generic/Icon';
import { Text } from 'grommet';

export interface IconLinkProps extends LinkProps {
  label: string;
  icon: GenericIconName;
}

export const IconLink: FC<IconLinkProps> = ({ label, icon, ...props }) => {
  return (
    <Link
      {...props}
      nav
      css={{
        flex: '1',
        opacity: 0.5,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        '&.link-matching': {
          opacity: 1,
          fontWeight: 'bold',
        },
        '&:focus': {
          color: 'var(--color-brand-dark)',
        },
      }}
    >
      <Icon
        name={icon}
        css={{ margin: 'auto', marginBottom: '0' }}
        size="22px"
      />
      <Text
        css={{
          margin: 'auto',
          marginTop: '0',
          fontSize: 'var(--font-size-xs)',
        }}
      >
        {label}
      </Text>
    </Link>
  );
};

export default IconLink;
