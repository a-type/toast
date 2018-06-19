import styled from 'styled-components';

export default styled.div`
  padding: 10px;
  background-color: var(--color-white);
  background-image: ${({ imageSrc }) =>
    imageSrc ? `url(${imageSrc})` : 'none'};
  background-size: cover;
  height: 100%;
  display: flex;
  align-items: flex-end;
  border-radius: 5px;
  box-shadow: inset 0 -36px 24px 0 #00000080;

  a:focus > &,
  a:hover > & {
    background-color: var(--color-brand);
    box-shadow: 0 0 0 8px var(--color-brand-light);
  }
`;
