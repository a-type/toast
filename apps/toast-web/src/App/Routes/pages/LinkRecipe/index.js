import React from 'react';
import Linker from 'features/recipes/Linker';
import { SingleColumn } from 'components/layouts';
import queryString from 'query-string';

export default class LinkRecipePage extends React.PureComponent {
  redirectOnDone = recipe => {
    this.props.history.push(`/recipes/${recipe.id}`);
  };

  render() {
    const { location } = this.props;

    const query = queryString.parse(location.search);

    return (
      <SingleColumn>
        <Linker onDone={this.redirectOnDone} externalParams={query} />
      </SingleColumn>
    );
  }
}
