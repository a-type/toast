import styled from 'styled-components';

export default styled<{ size: string }, 'div'>('div')`
  width: ${props => props.size};
  height: ${props => props.size};
  font-size: calc(${props => props.size} / 3);
  border-radius: calc(${props => props.size} / 5);
  position: relative;
  overflow: hidden;
  display: flex;

  & > * {
    margin: auto;
  }
`;
