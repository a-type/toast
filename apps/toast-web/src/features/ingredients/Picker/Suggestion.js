import styled from 'styled-components';

export default styled.div`
  padding: 10px;
  cursor: pointer;
  text-transform: capitalize;
  color: ${props =>
    props.active ? 'var(--color-brand)' : 'var(--color-black)'};

  &:hover,
  &:focus {
    color: var(--color-brand);
  }
`;
