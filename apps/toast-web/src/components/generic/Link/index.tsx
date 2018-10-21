import styled from 'styled-components';
import * as React from 'react';
import { Link as LibLink } from 'react-router-dom';
import { getSize } from 'theme';

type InnerLinkProps = {
  to: string;
  children: React.ReactNode;
  forceRemote?: boolean;
  newTab?: boolean;
  className?: string;
  id?: string;
};

export type LinkProps = InnerLinkProps & {
  spaceBelow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
};

export const BaseLink = ({
  to,
  children,
  forceRemote,
  newTab,
  ...props
}: InnerLinkProps) => {
  if (!to) {
    return <span {...props}>{children}</span>;
  }

  if (/^https?:\/\//.test(to) || forceRemote) {
    return (
      <a href={to} target="_blank" {...props}>
        {children}
      </a>
    );
  }

  return (
    <LibLink to={to} {...props} target={newTab ? '_blank' : undefined}>
      {children}
    </LibLink>
  );
};

export default styled<LinkProps>(({ spaceBelow, ...rest }) => (
  <BaseLink {...rest} />
))`
  color: inherit !important;
  text-decoration: none;
  margin-bottom: ${props =>
    props.spaceBelow ? getSize(props.spaceBelow) : 'initial'};
  display: block;

  &:focus {
    outline: none;
  }
`;
