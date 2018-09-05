import styled from 'styled-components';

const AppLayout = styled.div`
  height: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
`;

AppLayout.Navigation = styled.div`
  flex: 0 0 auto;
  z-index: 10;
  pointer-events: none;

  & > * {
    pointer-events: initial;
  }
`;

AppLayout.Content = styled.div`
  flex: 1;
  z-index: 5;
  pointer-events: none;

  & > * {
    pointer-events: initial;
  }
`;

export default AppLayout;
