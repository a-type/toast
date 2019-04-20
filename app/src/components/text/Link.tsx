import * as React from 'react';
import styled from 'styled-components';
import BaseLink, { LinkProps } from 'components/generic/Link';
import { Text } from 'grommet';

export type TextLinkProps = LinkProps & {
  to?: string;
};

const ProtectedBaseLink = (props: TextLinkProps) => <BaseLink {...props} />;

const LinkWrap = styled<TextLinkProps>(ProtectedBaseLink)`
  color: var(--color-link-foreground);
  text-decoration: underline;
  transition: 0.25s ease-in-out;
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: -0.5em;
    right: -0.5em;
    top: 0;
    bottom: 0;
    border-radius: 1em;
    background: var(--color-brand-light);
    opacity: 0;
    transition: 0.25s ease-in-out;
  }

  &:hover {
    color: var(--color-link-active);

    &::after {
      opacity: 0.25;
    }
  }

  &:focus {
    outline: none;
    color: var(--color-link-active);

    &::after {
      opacity: 0.25;
    }
  }
`;

LinkWrap.defaultProps = {
  to: '#',
};

const LinkText = styled(Text)`
  color: var(--color-brand-dark);
`;

const Link: React.SFC<TextLinkProps> = ({ children, to, ...props }) =>
  to ? (
    <LinkWrap to={to} {...props}>
      <LinkText>{children}</LinkText>
    </LinkWrap>
  ) : (
    <span {...props}>
      <LinkText>{children}</LinkText>
    </span>
  );

export default Link;
