import styled from 'styled-components';
import { loading } from '../common/effects';

const Pill = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  background: var(--color-gray-lightest);
  padding: 5px 10px;
  border-radius: 10px;
  transition: background 0.2s ease-in-out;
  font-size: 14px;
  font-family: inherit;

  ${props => (props.loading ? loading : '')};
`;

Pill.InteractiveContent = styled(Pill)`
  display: flex;
  flex-direction: row;

  & > *:first-child {
    margin: auto auto auto 0;
  }
  & > *:not(:first-child) {
    margin: auto 0 auto 5px;
  }
`;

Pill.Ghost = styled(Pill)`
  background: transparent;
  border-style: dashed;
  border-color: ${props =>
    props.active ? 'var(--color-black)' : 'var(--color-gray-light)'};
  color: ${props =>
    props.active ? 'var(--color-black)' : 'var(--color-gray-light)'};

  ${props => (props.loading ? loading : '')};
`;

export default Pill;
