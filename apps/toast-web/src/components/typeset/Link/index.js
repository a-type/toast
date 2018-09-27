import styled from 'styled-components';
import LibLink from './BaseLink';
import Clear from './Clear';
import { getSize } from 'theme';

const Link = styled(LibLink)`
  color: var(--color-brand);
  text-decoration: underline;
  transition: 0.25s ease-in-out;
  font-size: ${props =>
    props.textSize ? `var(--font-size-${props.textSize})` : `inherit`};

  &:hover {
    color: var(--color-brand-dark);
  }

  &:focus {
    outline: none;
    color: var(--color-brand-dark);
  }

  margin-top: ${props => (props.inline ? 'auto' : '-0.16em')};
  margin-bottom: ${props =>
    props.inline ? 'auto' : `calc(${getSize(props.spaceBelow)} - 0.36em)`};
`;

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

Link.Clear = Clear;

Link.defaultProps = {
  to: '#',
  textSize: null,
  inline: false,
};

export default Link;
