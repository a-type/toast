import styled from 'styled-components';

export default styled<{ size?: string }, 'div'>('div')`
  padding: calc(${props => props.size || '32px'} / 3);
  border-radius: calc(${props => props.size || '32px'} / 3);
  background: var(--color-brand);
  position: relative;
  overflow: hidden;
`;
