import styled, { StyledComponentClass } from 'styled-components';

type IAppLayout = StyledComponentClass<any, any, any> & {
  Navigation: StyledComponentClass<any, any, any>;
  Content: StyledComponentClass<any, any, any>;
};

const AppLayout = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-areas: 'navigation' 'content';
  grid-template-rows: auto 1fr;
` as IAppLayout;

AppLayout.Navigation = styled.div`
  grid-area: navigation;
  width: 100%;
`;

AppLayout.Content = styled.div`
  grid-area: content;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

export default AppLayout;
