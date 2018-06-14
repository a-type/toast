import styled, { css } from 'styled-components';
import { Input } from 'components/generic';

export default styled(Input)`
  background: ${props =>
    props.active ? 'var(--color-white)' : 'var(--color-gray-lightest)'};
`;
