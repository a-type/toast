import styled from 'styled-components';
import * as React from 'react';
import { Link as LibLink, NavLink as LibNavLink } from 'react-router-dom';

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

export type LinkProps = InnerLinkProps;

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
        <a href="#" onClick={onClick} {...props} ref={ref}>
          {children}
        </a>
      );
    }

    if (/^https?:\/\//.test(to) || /^mailto:/.test(to) || forceRemote) {
      return (
        <a href={to} target="_blank" onClick={onClick} {...props} ref={ref}>
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
              onClick && onClick(e);
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
            onClick && onClick(e);
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

export default styled<LinkProps>(BaseLink)`
  color: inherit;
  text-decoration: none;
  display: block;

  &:focus {
    outline: none;
  }
`;
