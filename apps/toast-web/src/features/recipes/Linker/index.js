import React from 'react';
import { Mutation, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Display from './Display';
import { path, pick } from 'ramda';
import { binaryStringToBlob } from 'blob-util';

const linkProps = [
  'title',
  'description',
  'attribution',
  'sourceUrl',
  'ingredientStrings',
  'servings',
  'cookTime',
  'prepTime',
  'unattendedTime',
];

const LinkRecipe = gql`
  mutation LinkRecipe($input: RecipeLinkInput!) {
    linkRecipe(input: $input) {
      id
    }
  }
`;

const SetImage = gql`
  mutation SetImage($id: ID!, $input: ImageCreateInput!) {
    updateRecipeCoverImage(id: $id, input: $input) {
      id
      coverImage {
        id
        url
        attribution
      }
    }
  }
`;

class RecipeLinker extends React.PureComponent {
  state = { error: null, recipeData: null };

  parseProvidedData = externalParams => {
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
      image: path(['img'], externalParams),
      nutrition: {
        calories: path(['ncal'], externalParams),
        carbohydrateContent: path(['ncrb'], externalParams),
        cholesterolContent: path(['ncol'], externalParams),
        fatContent: path(['nfat'], externalParams),
        fiberContent: path(['fbr'], externalParams),
        proteinContent: path(['nprt'], externalParams),
        saturatedFatContent: path(['nsft'], externalParams),
        servingSize: path(['nsvs'], externalParams),
        sodiumContent: path(['nsdm'], externalParams),
        sugarContent: path(['nsgr'], externalParams),
        transFatContent: path(['ntft'], externalParams),
        unsaturatedFatContent: path(['nuft'], externalParams),
      },
    };
  };

  componentDidMount() {
    if (this.props.externalParams) {
      if (this.props.externalParams.mode !== 'postMessage') {
        this.setState({ recipeData: this.parseProvidedData(this.props.externalParams) });
      } else {
        // wait for post message
        window.addEventListener('message', this.handleMessage, false);
      }
    }
  }

  handleMessage = message => {
    if (message.data && message.data.type === 'recipeData') {
      this.setState({ recipeData: this.parseProvidedData(message.data.data) });
    }
  }

  handleError = err => {
    this.setState({ error: err });
  };

  handleDone = async recipe => {
    // attach an image if one was provided
    const { recipeData } = this.state;

    if (recipeData.image) {
      await this.props.setImage(recipe.id, recipeData.image, recipeData.attribution);
    }

    this.props.onDone(recipe);
  };

  render() {
    const { error, recipeData } = this.state;

    if (error) {
      return <div>{error.message}</div>;
    }

    if (!recipeData) {
      return null;
    }

    return (
      <Mutation mutation={LinkRecipe} variables={{ input: pick(linkProps, recipeData) }}>
        {save => (
          <Display
            save={save}
            onDone={this.handleDone}
            onError={this.handleError}
          />
        )}
      </Mutation>
    );
  }
}

export default graphql(SetImage, { props: ({ mutate }) => ({
  setImage: (id, image, attribution) => mutate({ variables: { id, input: { url: image, attribution, }}})
})})(RecipeLinker);
