import React from 'react';
import Linker from 'features/recipes/Linker';
import queryString from 'query-string';
import { RouteComponentProps } from 'react-router-dom';
import { LayoutTypes, Layout } from 'components/layout';

export default class LinkRecipePage extends React.PureComponent<
  RouteComponentProps
> {
  render() {
    return (
      <Layout backgroundStyle={LayoutTypes.BackgroundStyle.Art}>
        <Linker />
      </Layout>
    );
  }
}
