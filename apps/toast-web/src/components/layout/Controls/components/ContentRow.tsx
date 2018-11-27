import styled from 'styled-components';

const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
  color: var(--color-dark);
  padding: 0 var(--spacing-md);

  & > * {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: auto;
  }

  & > * + * {
    margin-left: var(--spacing-md);
  }
`;

export default ContentRow;
