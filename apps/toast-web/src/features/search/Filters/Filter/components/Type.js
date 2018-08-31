import styled from 'styled-components';

export default styled.div`
  background-color: ${props => `var(--color-${props.color})`};
  color: var(--color-white);
  padding: var(--spacing-sm) var(--spacing-md);
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;
