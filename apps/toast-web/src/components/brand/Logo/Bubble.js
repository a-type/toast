import styled from 'styled-components';

const getColor = props => {
  switch (props.color) {
    case 1:
      return 'var(--color-negative)';
    case 2:
      return 'var(--color-positive)';
    default:
      return 'var(--color-brand)';
  }
};

export default styled.div.attrs({
  color: () => Math.floor(Math.random() * 3),
  size: () => Math.random() * 2 + 4,
  x: () => Math.random() * 100,
  y: () => Math.random() * 100,
})`
  background-color: ${getColor};
  border-radius: 100%;
  position: absolute;
  transition: 0.2s ease-in-out all;

  ${props =>
    props.show
      ? `
    top: ${props.y}%;
    left: ${props.x}%;
    width: ${props.size}vh;
    height: ${props.size}vh;
  `
      : 'top: 50%; left: 50%; width: 0; height: 0;'};
`;
