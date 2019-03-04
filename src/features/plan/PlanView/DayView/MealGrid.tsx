import styled from 'styled-components';

const MealGrid = styled.div`
  display: grid;
  grid-template-areas: 'breakfast dinner' 'lunch dinner';
  height: 33vh;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);

  justify-content: stretch;
  align-items: stretch;

  & > *:first-child {
    grid-area: breakfast;
  }

  & > *:nth-child(2) {
    grid-area: lunch;
  }

  & > *:nth-child(3) {
    grid-area: dinner;
  }
`;

export default MealGrid;
