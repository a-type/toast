import styled from 'styled-components';

export default styled<{ size?: string }, 'h1'>('h1')`
  margin: auto 0;
  padding: 0;
  font-family: var(--font-logo);
  font-size: ${props => props.size || '36px'};
  font-weight: var(--normal);
  color: var(--color-white);
  line-height: 1;
  position: relative;
  z-index: 1;
`;
