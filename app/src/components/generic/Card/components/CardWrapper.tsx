import styled from 'styled-components';

const CardWrapper = styled<{ imageSrc?: string; onClick?: any }, 'div'>('div')`
  background-color: var(--color-gray-lightest);
  background-image: ${props =>
    props.imageSrc ? `url(${props.imageSrc})` : 'none'};
  border-radius: var(--border-radius-md);
  padding: 2px;
  position: relative;
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  height: 100%;
`;

export default CardWrapper;
