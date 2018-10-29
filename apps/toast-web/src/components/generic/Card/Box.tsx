import styled from 'styled-components';

const mainShadow = ({ imageSrc }: { imageSrc?: string }) =>
  imageSrc ? 'inset 0 -36px 24px 0 #00000080' : '0';
const hoverShadow = ({ imageSrc }: { imageSrc?: string }) =>
  imageSrc
    ? 'inset 0 -36px 24px 0 #00000080, 0 0 0 8px var(--color-brand-light)'
    : '0 0 0 8px var(--color-brand-light)';

export default styled<{ imageSrc?: string; className?: string }, 'div'>('div')`
  padding: var(--spacing-sm);
  background-color: var(--color-white);
  background-image: ${({ imageSrc }) =>
    imageSrc ? `url(${imageSrc})` : 'none'};
  background-size: cover;
  background-position: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: var(--border-radius-md);
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
