import React from 'react';
import Editor from 'features/recipes/Creator';
import { SingleColumn, Content } from 'components/layouts';
import queryString from 'query-string';
import { Navigation } from 'features/structure';
import { RouteComponentProps } from 'react-router-dom';

export default class EditRecipePage extends React.PureComponent<
  RouteComponentProps<{ recipeId: string }>
> {
  redirectOnCreate = recipeId => {
    const { location } = this.props;
    const query = location.search;
    this.props.history.push(`/recipes/${recipeId}/edit${query}`);
  };

  render() {
    const {
      match: { params },
      location,
    } = this.props;

    const query = queryString.parse(location.search);

    return (
      <SingleColumn>
        <Navigation />
        <Content>
          <Editor
            recipeId={params.recipeId}
            onCreate={this.redirectOnCreate}
            externalParams={query}
          />
        </Content>
      </SingleColumn>
    );
  }
}
