import styled from 'styled-components';
import { focusShadow } from 'components/effects';

export default styled.div`
  background-color: var(--color-brand);
  overflow: hidden;
  position: relative;
  cursor: pointer;
  padding: 10px;
  margin: auto;
  border-radius: var(--border-radius-md);

  *:focus > & {
    box-shadow: ${focusShadow.default};
  }
`;
