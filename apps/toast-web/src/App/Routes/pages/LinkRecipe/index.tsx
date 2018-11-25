import React from 'react';
import Linker from 'features/recipes/Linker';
import { SingleColumn, Content } from 'components/layouts';
import queryString from 'query-string';
import { RouteComponentProps } from 'react-router-dom';

export default class LinkRecipePage extends React.PureComponent<
  RouteComponentProps
> {
  redirectOnDone = recipe => {
    this.props.history.push(`/recipes/${recipe.id}`);
  };

  render() {
    const { location } = this.props;

    const query = queryString.parse(location.search);

    return (
      <SingleColumn noScroll>
        <Content>
          <Linker onDone={this.redirectOnDone} externalParams={query} />
        </Content>
      </SingleColumn>
    );
  }
}
