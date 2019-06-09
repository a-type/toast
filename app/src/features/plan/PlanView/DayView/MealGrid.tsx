import styled from 'styled-components';

const MealGrid = styled.div`
  display: grid;
  min-height: 33vh;
  grid-template-areas: 'breakfast lunch' 'dinner dinner';
  grid-template-rows: auto auto;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);

  justify-content: stretch;
  align-items: stretch;

  @media (min-width: 900px) {
    grid-template-areas: 'breakfast dinner' 'lunch dinner';
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }

  & > * {
    margin: 0;
  }

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
