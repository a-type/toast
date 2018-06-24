import React from 'react';
import Editor from 'components/recipes/Editor';

export default class EditRecipePage extends React.PureComponent {
  redirectOnCreate = recipe => {
    console.info(recipe);
    this.props.history.push(`/recipes/edit/${recipe.id}`);
  };

  render() {
    const {
      match: { params },
    } = this.props;
    return (
      <Editor recipeId={params.recipeId} onCreate={this.redirectOnCreate} />
    );
  }
}
