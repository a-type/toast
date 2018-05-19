// @flow

import React, { type Node } from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Create, Update } from 'mutations/Recipes';
import { Basic } from 'queries/Recipes';
import { compose, branch } from 'recompose';
import type { Recipe, RecipeParams } from 'types';
import type { RecipeEditorFormState } from './types';

type RecipeEditorStateProps = {
  history: any,
  create(params: RecipeParams): Promise<{ data: { createRecipe: Recipe } }>,
  children(params: RecipeEditorFormState): Node,
};

type RecipeEditorState = {
  loading: boolean,
  title: string,
};

class RecipeEditorCreateStateProvider extends React.Component<
  RecipeEditorStateProps,
  RecipeEditorState,
> {
  state = {
    loading: false,
    title: '',
  };

  handleFieldChange = (fieldName: string, value: string) => {
    this.setState({ [fieldName]: value });
  };
  handleFieldBlur = async fieldName => {
    if (fieldName === 'title' && this.state.title.length > 0) {
      this.setState({ loading: true });
      try {
        const { data } = await this.props.create({ title: this.state.title });
        this.setState({ loading: false });
        this.props.history.push(`/recipes/edit/${data.createRecipe.id}`);
      } catch (err) {
        console.error(err);
        this.setState({ loading: false });
      }
    }
  };

  render() {
    const { loading, title } = this.state;

    const args = {
      loading,
      saving: false,
      title,
      description: '',
      onFieldChange: this.handleFieldChange,
      onFieldBlur: this.handleFieldBlur,
      isTitleEnabled: true,
      isDescriptionEnabled: false,
    };
    return this.props.children(args);
  }
}

export default compose(
  withRouter,
  graphql(Create, {
    props: ({ ownProps, mutate }) => ({
      create: (params: RecipeParams) =>
        mutate({
          variables: { ...params },
        }),
    }),
  }),
)(RecipeEditorCreateStateProvider);
