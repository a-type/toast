import styled from 'styled-components';

export default styled.div`
  background: var(--color-white);
  padding: var(--spacing-md);
  padding-bottom: 0;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & > div {
    margin-bottom: var(--spacing-md);
  }

  & > div:not(:last-child) {
    margin-right: var(--spacing-md);
  }
`;
