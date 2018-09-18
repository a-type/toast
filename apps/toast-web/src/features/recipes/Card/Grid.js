import styled from 'styled-components';
import { loading } from 'components/effects';

export default styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: 10vh;

  grid-gap: 20px;
  grid-auto-flow: dense;
  margin-bottom: var(--spacing-lg);

  ${props => (props.loading ? loading : '')};

  @media (max-height: 600px) {
    grid-auto-rows: 20vmax;
  }

  & > *.large {
    grid-column-end: span 2;
    grid-row-end: span 2;
  }

  & > *.wide {
    grid-column-end: span 2;
  }
`;
