import styled from 'styled-components';

const MonthContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: var(--spacing-sm);

  & > * {
    flex: 1;
    margin: auto 0;
    text-align: center;
  }

  & > *:first-child {
    flex: 0 0 auto;
  }

  & > *:last-child {
    flex: 0 0 auto;
  }
`;
export default MonthContainer;
