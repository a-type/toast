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

interface LinkWithVariants extends StyledComponentClass<TextLinkProps, {}> {
  Positive: StyledComponentClass<TextLinkProps, {}>;
  Negative: StyledComponentClass<TextLinkProps, {}>;
  Clear: typeof BaseLink;
}

const ProtectedBaseLink = ({
  textSize,
  inline,
  spaceBelow,
  ...rest
}: TextLinkProps) => <BaseLink {...rest} />;

const Link = styled<TextLinkProps>(ProtectedBaseLink)`
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
` as LinkWithVariants;

Link.Positive = styled(Link)`
  color: var(--color-positive);

  &:hover {
    color: var(--color-positive-dark);
  }
`;

Link.Negative = styled(Link)`
  color: var(--color-negative);

  &:hover {
    color: var(--color-negative-dark);
  }
`;

Link.Clear = BaseLink;

Link.defaultProps = {
  to: '#',
  textSize: null,
  inline: false,
};

export default Link;
