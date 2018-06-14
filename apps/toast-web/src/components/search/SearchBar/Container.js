import styled from 'styled-components';

export default styled.div`
  box-shadow: ${props =>
    props.active
      ? `
    0 0 10000px 10000px #00000008,
    0 16px 32px 0 #00000040
  `
      : 'none'};

  transition: 0.2s all ease;
`;
