import styled from 'styled-components';

const mainShadow = ({ imageSrc }) =>
  imageSrc ? 'inset 0 -36px 24px 0 #00000080' : '0';
const hoverShadow = ({ imageSrc }) =>
  imageSrc
    ? 'inset 0 -36px 24px 0 #00000080, 0 0 0 8px var(--color-brand-light)'
    : '0 0 0 8px var(--color-brand-light)';

export default styled.div`
  padding: 10px;
  background-color: var(--color-white);
  background-image: ${({ imageSrc }) =>
    imageSrc ? `url(${imageSrc})` : 'none'};
  background-size: cover;
  background-position: center;
  height: 100%;
  display: flex;
  align-items: flex-end;
  border-radius: 5px;
  box-shadow: ${mainShadow};
  border: ${props => (props.imageSrc ? '0' : '2px')} solid
    var(--color-gray-light);
  transition: 0.2s ease all;

  a:focus > &,
  a:hover > & {
    background-color: var(--color-brand);
    box-shadow: ${hoverShadow};
    border-color: var(--color-brand);
  }
`;
