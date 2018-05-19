import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px 10px;

  & > * {
    margin: 0;
    padding: 20px;
  }

  & > *:first-child {
    border-right: 1px dashed var(--color-gray);
  }
`;
