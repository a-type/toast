import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Display from './Display';
import { path } from 'ramda';

const LinkRecipe = gql`
  mutation LinkRecipe($input: RecipeLinkInput!) {
    linkRecipe(input: $input) {
      id
    }
  }
`;

export default class RecipeLinker extends React.PureComponent {
  state = { error: null };

  parseProvidedData = () => {
    const { externalParams = {} } = this.props;

    return {
      title: path(['ttl'], externalParams),
      description: path(['dsc'], externalParams),
      attribution: path(['att'], externalParams),
      sourceUrl: path(['src'], externalParams),
      ingredientStrings: [].concat(path(['ing'], externalParams)),
      servings: path(['srv'], externalParams),
      cookTime: path(['ctm'], externalParams),
      prepTime: path(['ptm'], externalParams),
      unattendedTime: path(['utm'], externalParams),
    };
  };

  handleError = err => {
    this.setState({ error: err });
  };

  render() {
    const { error } = this.state;

    if (error) {
      return <div>{error.message}</div>;
    }

    const parsed = this.parseProvidedData();

    return (
      <Mutation mutation={LinkRecipe} variables={{ input: parsed }}>
        {save => (
          <Display
            save={save}
            onDone={this.props.onDone}
            onError={this.handleError}
          />
        )}
      </Mutation>
    );
  }
}
