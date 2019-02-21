import * as React from 'react';
import styled from 'styled-components';
import BaseLink, { LinkProps } from 'components/generic/Link';
import { Text } from 'grommet';

export type TextLinkProps = LinkProps & {
  to?: string;
  margin?: any;
};

const ProtectedBaseLink = (props: TextLinkProps) => <BaseLink {...props} />;

const LinkWrap = styled<TextLinkProps>(ProtectedBaseLink)`
  color: var(--color-link-foreground);
  text-decoration: underline;
  transition: 0.25s ease-in-out;
  display: inline-block;

  &:hover {
    color: var(--color-link-active);
  }

  &:focus {
    outline: none;
    color: var(--color-link-active);
  }
`;

LinkWrap.defaultProps = {
  to: '#',
};

const LinkText = styled(Text)`
  color: var(--color-brand-dark);
`;

const Link: React.SFC<TextLinkProps> = ({ children, margin, ...props }) => (
  <LinkWrap {...props}>
    <LinkText margin={margin}>{children}</LinkText>
  </LinkWrap>
);

export default Link;
