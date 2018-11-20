import { Content } from 'components/layouts';
import styled from 'styled-components';

/**
 * A special Content style designed to overlay a fancy background...
 */
export default styled(Content)`
  --color-content-foreground: var(--color-white);
  --color-content-background: #7d6a6a9c;
  --color-heading: var(--color-white);
  --color-field-background: var(--color-brand-dark);
  --color-field-foreground: var(--color-white);

  background-blend-mode: overlay;

  backdrop-filter: blur(8px);
`;
