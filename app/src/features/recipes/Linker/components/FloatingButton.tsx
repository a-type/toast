import styled from 'styled-components';
import { Button } from 'grommet';

const FloatingButton = styled(Button)`
  position: fixed;
  left: var(--spacing-md);
  bottom: var(--spacing-md);
`;

export default FloatingButton;
