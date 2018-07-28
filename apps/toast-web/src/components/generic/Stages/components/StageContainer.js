import styled from 'styled-components';

export default styled.div`
  margin-bottom: var(--spacing-md);
  opacity: ${props => (props.active ? 1 : 0.6)};
  transition: 0.2s ease opacity;

  &:hover {
    opacity: 1;
  }
`;
