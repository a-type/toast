import styled from 'styled-components';
import { Link as LibLink } from 'react-router-dom';
import Clear from './Clear';

const Link = styled(LibLink)`
  color: var(--color-brand);
  text-decoration: underline;
  transition: 0.25s ease-in-out;
  font-size: ${props =>
    props.textSize ? `var(--font-size-${props.textSize})` : `inherit`};

  &:hover {
    color: var(--color-brand-dark);
  }
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
