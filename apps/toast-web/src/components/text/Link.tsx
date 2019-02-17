import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';
import BaseLink, { LinkProps } from 'components/generic/Link';
import { getSize } from 'theme';

export type TextLinkProps = LinkProps & {
  to?: string;
  textSize?: 'sm' | 'md' | 'lg';
  inline?: boolean;
  spaceBelow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
};

const ProtectedBaseLink = ({
  textSize,
  inline,
  spaceBelow,
  ...rest
}: TextLinkProps) => <BaseLink {...rest} />;

const LinkWrap = styled<TextLinkProps>(ProtectedBaseLink)`
  color: var(--color-link-foreground);
  text-decoration: underline;
  transition: 0.25s ease-in-out;
  font-size: ${props =>
    props.textSize ? `var(--font-size-${props.textSize})` : `inherit`};
  display: inline-block;

  &:hover {
    color: var(--color-link-active);
  }

  &:focus {
    outline: none;
    color: var(--color-link-active);
  }

  margin-top: ${props => (props.inline ? 'auto' : '-0.16em')};
  margin-bottom: ${props =>
    props.inline ? 'auto' : `calc(${getSize(props.spaceBelow)} - 0.36em)`};
`;

LinkWrap.defaultProps = {
  to: '#',
  textSize: null,
  inline: false,
};

const LinkText = styled.span`
  color: var(--color-brand-dark);
`;

const Link: React.SFC<TextLinkProps> = ({ children, ...props }) => (
  <LinkWrap {...props}>
    <LinkText>{children}</LinkText>
  </LinkWrap>
);

export default Link;
