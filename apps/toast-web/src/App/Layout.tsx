import styled, { StyledComponentClass } from 'styled-components';

type IAppLayout = StyledComponentClass<any, any, any> & {
  Navigation: StyledComponentClass<any, any, any>;
  Content: StyledComponentClass<any, any, any>;
};

const AppLayout = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
` as IAppLayout;

AppLayout.Navigation = styled.div`
  flex: 0 0 auto;
  z-index: 10;
  pointer-events: none;
  position: absolute;
  width: 100%;

  & > * {
    pointer-events: initial;
  }
`;

AppLayout.Content = styled.div`
  flex: 1;
  z-index: 5;
  pointer-events: none;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  & > * {
    pointer-events: initial;
  }
`;

export default AppLayout;
