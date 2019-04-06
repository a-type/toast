import styled from 'styled-components';

const Bar = styled.div`
  background: var(--color-brand);
  color: var(--color-dark);
  display: flex;
  flex-direction: row;

  padding-left: 64px;
  padding-top: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  padding-right: var(--spacing-md);

  flex: 0 0 auto;

  & > * {
    margin-top: auto;
    margin-bottom: auto;
  }

  & > *:nth-child(2) {
    flex: 1;
  }
`;

export default Bar;
