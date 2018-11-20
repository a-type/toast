import styled from 'styled-components';

export default styled<{ past?: boolean }, 'div'>('div')`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 'dinner lunch' 'dinner breakfast';
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);

  opacity: ${props => (props.past ? '0.5' : '1')};

  & > *:nth-child(1) {
    grid-area: breakfast;
  }
  & > *:nth-child(2) {
    grid-area: lunch;
  }
  & > *:nth-child(3) {
    grid-area: dinner;
  }
`;
