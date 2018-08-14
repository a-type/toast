import styled from 'styled-components';

export default styled.div`
  margin-bottom: 10vh;
  max-height: 70vh;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  width: 90vw;

  padding: var(--spacing-lg);
  background: var(--color-white);
  box-shadow: 0 0 1080px 100px #00000020;
  border-radius: var(--spacing-xs);

  @media (min-width: 666.666667px) {
    width: 600px;
    margin-bottom: auto;
    margin-top: 10vh;
  }
`;
