import styled from 'styled-components';

export default styled<{ backgroundColor?: string }, 'div'>('div')`
  background-color: ${props => `var(--color-${props.backgroundColor})`};
  overflow: hidden;
  position: relative;
  padding: 10px;
`;
