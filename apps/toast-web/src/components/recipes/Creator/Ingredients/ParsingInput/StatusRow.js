import styled from 'styled-components';

const StatusRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: var(--spacing-xs);
  font-size: var(--font-size-sm);

  & > * {
    padding: 0 var(--spacing-sm);
    transition: 0.2s ease all;
    border-radius: var(--font-size-sm);
  }

  & > * + * {
    margin-left: var(--spacing-xs);
  }
`;

StatusRow.Value = styled.div`
  background: ${props =>
    props.empty ? 'transparent' : 'var(--color-positive)'};
  color: ${props =>
    props.empty ? 'var(--color-positive)' : 'var(--color-white)'};
  border: 1px ${props => (props.empty ? 'dotted' : 'solid')}
    var(--color-positive);
`;

StatusRow.Unit = styled.div`
  background: var(--color-positive-dark);
  color: var(--color-white);
`;

StatusRow.Ingredient = styled.div`
  background: ${props => (props.empty ? 'transparent' : 'var(--color-brand)')};
  color: ${props =>
    props.empty ? 'var(--color-brand)' : 'var(--color-white)'};
  border: 1px ${props => (props.empty ? 'dotted' : 'solid')} var(--color-brand);
`;

export default StatusRow;
