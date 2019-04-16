import styled from 'styled-components';

const Bar = styled.div`
  background: var(--color-positive);
  color: var(--color-white);
  display: flex;
  flex-direction: row;

  padding: var(--spacing-md);

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
