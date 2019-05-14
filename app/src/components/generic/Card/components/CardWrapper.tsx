import styled from 'styled-components';

const CardWrapper = styled<{ imageSrc?: string; onClick?: any }, 'div'>('div')`
  background-color: var(--color-gray-light);
  background-image: ${props =>
    props.imageSrc ? `url(${props.imageSrc})` : 'none'};
  background-size: cover;
  border-radius: var(--border-radius-md);
  padding: 2px;
  position: relative;
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  height: 100%;
  box-shadow: 0 4px 8px 0 var(--color-shadow);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  overflow: hidden;
`;

export default CardWrapper;
