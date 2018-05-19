// @flow

import React, { type Node } from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Create, Update } from 'mutations/Recipes';
import { Basic } from 'queries/Recipes';
import { compose, branch } from 'recompose';
import type { Recipe, RecipeParams } from 'types';
import type { RecipeEditorFormState } from './types';
import type { QueryData } from '../types';

type RecipeEditorStateProps = {
  recipe: Recipe,
  history: any,
  update(params: RecipeParams): Promise<{ data: { updateRecipe: Recipe } }>,
  children(params: RecipeEditorFormState): Node,
};

type RecipeEditorState = {
  saving: boolean,
  title: string,
  description: string,
};

const SAVE_TIMEOUT = 10000;

class RecipeEditorUpdateStateProvider extends React.Component<
  RecipeEditorStateProps,
  RecipeEditorState,
> {
  state = {
    saving: false,
    title: '',
    description: '',
  };

  saveTimeout: TimeoutID | null = null;

  componentDidMount() {
    this.load(this.props.recipe);
  }
  componentWillReceiveProps(newProps) {
    this.load(newProps.recipe);
  }

  load = (recipe: Recipe) => {
    if (!recipe) {
      return;
    }

    this.setState({
      title: recipe.title,
      description: recipe.description,
    });
  };

  save = async () => {
    const { update, recipe } = this.props;
    const { title, description } = this.state;

    if (
      !recipe ||
      recipe.title !== title ||
      recipe.description !== description
    ) {
      this.setState({ saving: true });
      try {
        await this.props.update({
          title,
          description,
        });
        this.setState({ saving: false });
      } catch (err) {
        console.error(err);
        this.setState({ saving: false });
      }
    }
  };
  startSaveTimer = () => {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(this.save, SAVE_TIMEOUT);
  };

  handleFieldChange = (fieldName: string, value: string) => {
    this.setState({ [fieldName]: value });
    this.startSaveTimer();
  };
  handleFieldBlur = () => {
    this.save();
  };

  render() {
    const { recipe } = this.props;
    const { saving, title, description } = this.state;

    const args = {
      saving,
      title: title || '',
      description: description || '',
      onFieldChange: this.handleFieldChange,
      onFieldBlur: this.handleFieldBlur,
      isTitleEnabled: true,
      isDescriptionEnabled: true,
    };

    return this.props.children(args);
  }
}

export default compose(
  withRouter,
  graphql(Update, {
    props: ({ ownProps, mutate }) => ({
      update: (params: RecipeParams) =>
        mutate({
          variables: { ...params, id: ownProps.recipe.id },
          optimisticResponse: {
            __typename: 'Mutation',
            updateRecipe: {
              __typename: 'Recipe',
              id: ownProps.recipe.id,
              ...params,
            },
          },
        }),
    }),
  }),
)(RecipeEditorUpdateStateProvider);
