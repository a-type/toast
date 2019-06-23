import styled from 'styled-components';

export default styled<{ src?: string }, 'div'>('div')`
  background-size: cover;
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-200);
  background-image: ${props => (props.src ? `url(${props.src})` : 'none')};
  background-position: 50% 50%;
  position: relative;
  overflow: hidden;
  display: flex;
  color: var(--color-grey-500);

  & > * {
    margin: auto;
  }
`;
