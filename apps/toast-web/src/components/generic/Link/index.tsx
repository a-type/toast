import styled from 'styled-components';
import * as React from 'react';
import { Link as LibLink, NavLink as LibNavLink } from 'react-router-dom';
import { getSize } from 'theme';

type InnerLinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  to?: string;
  children?: React.ReactNode;
  forceRemote?: boolean;
  newTab?: boolean;
  className?: string;
  id?: string;
  nav?: boolean;
  exact?: boolean;
  download?: string;
};

export type LinkProps = InnerLinkProps & {
  spaceBelow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
};

export const BaseLink = React.forwardRef(
  (
    {
      to,
      children,
      forceRemote,
      newTab,
      nav,
      onClick,
      exact,
      ...props
    }: InnerLinkProps,
    ref: any,
  ) => {
    if (!to) {
      return (
        <a href="#" {...props} ref={ref}>
          {children}
        </a>
      );
    }

    if (/^https?:\/\//.test(to) || forceRemote) {
      return (
        <a href={to} target="_blank" {...props} ref={ref}>
          {children}
        </a>
      );
    }

    if (nav) {
      return (
        <LibNavLink
          to={to}
          {...props}
          ref={ref}
          activeClassName="link-matching"
          exact={exact}
          onClick={e => {
            if (window['swUpdate']) {
              e.preventDefault();
              return (window.location.pathname = to);
            }
            return onClick && onClick(e);
          }}
        >
          {children}
        </LibNavLink>
      );
    }

    return (
      <LibLink
        to={to}
        {...props}
        target={newTab ? '_blank' : undefined}
        ref={ref}
        onClick={e => {
          if (window['swUpdate']) {
            e.preventDefault();
            return (window.location.pathname = to);
          }
          return onClick && onClick(e);
        }}
      >
        {children}
      </LibLink>
    );
  },
);

export default styled<LinkProps>(({ spaceBelow, ...rest }) => (
  <BaseLink {...rest} />
))`
  color: inherit;
  text-decoration: none;
  margin-bottom: ${props =>
    props.spaceBelow ? getSize(props.spaceBelow) : 'initial'};
  display: block;

  &:focus {
    outline: none;
  }
`;
