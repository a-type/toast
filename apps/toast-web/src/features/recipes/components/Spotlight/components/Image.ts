import styled from 'styled-components';

export default styled<{ src?: string }, 'div'>('div')`
  background-size: cover;
  border-radius: var(--border-radius-md);
  background-color: var(--color-gray-light);
  background-image: ${props => (props.src ? `url(${props.src})` : 'none')};
  background-position: 50% 50%;
`;
