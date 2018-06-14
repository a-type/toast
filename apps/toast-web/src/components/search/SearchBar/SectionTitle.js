import styled from 'styled-components';
import { getCss } from 'components/utils/rhythm';

export default styled.h4`
  font-size: var(--font-size-md);
  padding: 0 var(--spacing-md);
  background: var(--color-gray-lightest);
  font-family: var(--font-fancy);

  ${getCss('md', { bottom: 1, top: 1 })};
`;
