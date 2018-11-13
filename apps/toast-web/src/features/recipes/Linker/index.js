import React from 'react';
import { Mutation, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { path, pick } from 'ramda';
import { binaryStringToBlob } from 'blob-util';
import { Content } from 'components/layouts';
import { compose } from 'recompose';
import { Loader, Icon } from 'components/generic';
import { Link } from 'components/typeset';
import Foreground from 'components/generic/Foreground';
import styled from 'styled-components';

const Overlay = styled.div`
  pointer-events: initial;
  background: var(--color-brand);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100000;
  padding: var(--spacing-md);

  display: flex;
  flex-direction: column;

  & > * {
    margin-left: auto;
    margin-right: auto;

    &:first-child {
      margin-top: auto;
    }

    &:last-child {
      margin-bottom: auto;
    }
  }
`;

const linkProps = [
  'title',
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
  state = { recipeData: null, created: null, error: null };

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
        this.link(this.parseProvidedData(this.props.externalParams));
      } else {
        // wait for post message
        window.addEventListener('message', this.handleMessage, false);
      }
    }
  }

  link = async recipeData => {
    try {
      const { data } = await this.props.link(recipeData);
      const recipe = data.linkRecipe;

      // attach an image if one was provided
      if (recipeData.image) {
        await this.props.setImage(
          recipe.id,
          recipeData.image,
          recipeData.attribution,
        );
      }

      this.setState({ created: data.linkRecipe });

      if (this.props.externalParams.mode !== 'postMessage') {
        this.props.onDone();
      }
    } catch (err) {
      console.error(err);
      this.setState({ error: err });
    }
  };

  handleMessage = message => {
    if (message.data && message.data.type === 'recipeData') {
      this.link(this.parseProvidedData(message.data.data));
    }
  };

  render() {
    const { error, created } = this.state;

    if (error) {
      return (
        <Foreground>
          <Overlay>
            <Icon name="warn" size="72px" />
            <div>
              Sorry, we couldn't scan this recipe. You can still add it
              manually, though.
            </div>
          </Overlay>
        </Foreground>
      );
    }

    return (
      <Foreground>
        <Overlay>
          {created ? (
            <React.Fragment>
              <div>Scanned!</div>
              <div>Click below to view this recipe in Toast</div>
              <Link.Clear newTab to={`/recipes/${created.id}`}>
                <Icon name="next-page" size="72px" />
              </Link.Clear>
            </React.Fragment>
          ) : (
            <Loader size="72px" />
          )}
        </Overlay>
      </Foreground>
    );
  }
}

export default compose(
  graphql(SetImage, {
    props: ({ mutate }) => ({
      setImage: (id, image, attribution) =>
        mutate({ variables: { id, input: { url: image, attribution } } }),
    }),
  }),
  graphql(LinkRecipe, {
    props: ({ mutate }) => ({
      link: recipeData =>
        mutate({ variables: { input: pick(linkProps, recipeData) } }),
    }),
  }),
)(RecipeLinker);
