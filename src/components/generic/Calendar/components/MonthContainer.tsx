import styled from 'styled-components';

const MonthContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);

  & > * {
    flex: 1;
    margin: auto;
    text-align: center;
  }
`;
export default MonthContainer;
