import React from 'react';
import Linker from 'components/recipes/Linker';
import queryString from 'query-string';

export default class LinkRecipePage extends React.PureComponent {
  redirectOnDone = recipe => {
    this.props.history.push(`/recipes/${recipe.id}`);
  };

  render() {
    const { location } = this.props;

    const query = queryString.parse(location.search);

    return <Linker onDone={this.redirectOnDone} externalParams={query} />;
  }
}
