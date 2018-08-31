import React from 'react';
import Editor from 'features/recipes/Creator';
import queryString from 'query-string';

export default class EditRecipePage extends React.PureComponent {
  redirectOnCreate = recipeId => {
    const { location } = this.props;
    const query = location.search;
    this.props.history.push(`/recipes/edit/${recipeId}${query}`);
  };

  render() {
    const {
      match: { params },
      location,
    } = this.props;

    const query = queryString.parse(location.search);

    return (
      <Editor
        recipeId={params.recipeId}
        onCreate={this.redirectOnCreate}
        externalParams={query}
      />
    );
  }
}
