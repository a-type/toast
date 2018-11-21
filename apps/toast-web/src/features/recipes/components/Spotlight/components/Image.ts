import styled from 'styled-components';

export default styled<{ src?: string }, 'div'>('div')`
  width: 100%;
  height: 100%;
  background-size: cover;
  border-radius: var(--border-radius-md);
  background-color: var(--color-gray-light);
  background-image: ${props => (props.src ? `url(${props.src})` : 'none')};
`;
