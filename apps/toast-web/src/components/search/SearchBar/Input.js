import styled, { css } from 'styled-components';
import { Input } from 'components/generic';

export default styled(Input)`
  background: ${props =>
    props.active ? 'var(--color-white)' : 'var(--color-gray-lightest)'};
  margin: auto;
  width: 100%;
  max-width: 600px;
  box-shadow: ${props =>
    props.active
      ? `
    0 0 10000px 10000px #00002008,
    0 16px 32px 0 #00002040
  `
      : 'none'};
  transition: 0.2s all ease;
`;
