import styled from 'styled-components';

export default styled.span`
  color: ${({ hasImage }) =>
    hasImage ? 'var(--color-white)' : 'var(--color-black)'};
  text-shadow: ${({ hasImage }) =>
    hasImage ? '0px 0px 2px rgba(0, 0, 0, 1)' : '0'};
  margin-bottom: -0.25em;
  width: 100%;
`;
