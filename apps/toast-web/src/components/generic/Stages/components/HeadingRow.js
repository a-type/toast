import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;

  padding-bottom: var(--spacing-sm);

  cursor: ${props => (props.onClick ? 'pointer' : 'default')};

  & > * {
    margin-top: auto;
    margin-bottom: auto;
  }

  & > h2 {
    margin-bottom: 3px;
    margin-left: var(--spacing-sm);
  }
`;
