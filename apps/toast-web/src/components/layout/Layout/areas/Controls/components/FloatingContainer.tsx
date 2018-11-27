import styled from 'styled-components';

const FloatingContainer = styled.div`
  --color-content-foreground: var(--color-dark);
  --color-content-background: var(--color-brand);
  --color-heading: var(--color-dark);
  --color-field-background: var(--color-brand-dark);
  --color-field-foreground: var(--color-white);
  --color-control-background: var(--color-brand-light);
  --color-control-foreground: var(--color-dark);

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  flex-direction: row;
  background: var(--color-brand);
  box-shadow: 0 -4px 8px 0 var(--color-shadow);
  border-radius: var(--border-radius-md);

  z-index: 100000;

  transition: 0.2s ease all;

  & > * {
    margin-top: auto;
    margin-bottom: auto;
  }

  & > *:first-child {
    flex: 1;
  }

  @media (min-width: 768px) {
    left: auto;
    right: var(--spacing-xl);
    bottom: var(--spacing-lg);
    width: auto;
    box-shadow: 0 4px 8px 0 var(--color-shadow);
  }

  &:empty {
    box-shadow: 0;
    display: none;
  }
`;

export default FloatingContainer;
