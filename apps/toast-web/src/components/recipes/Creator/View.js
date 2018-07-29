import React from 'react';
import Details, { RecipeCreateDetailsFragment } from './Details';
import Ingredients, { RecipeCreateIngredientsFragment } from './Ingredients';
import Steps, { RecipeCreateStepsFragment } from './Steps';
import { Stages, H1 } from 'components/generic';
import { Layout } from './components';
import { pick, path } from 'ramda';
import gql from 'graphql-tag';

export const RecipeCreateViewFragment = gql`
  fragment RecipeCreateView on Recipe {
    ...RecipeCreateDetails
    ...RecipeCreateIngredients
    ...RecipeCreateSteps
  }

  ${RecipeCreateDetailsFragment}
  ${RecipeCreateIngredientsFragment}
  ${RecipeCreateStepsFragment}
`;

export default class RecipeCreator extends React.PureComponent {
  getCompletedStage = () => {
    if (!this.props.recipe) {
      return -1;
    }

    const { recipe } = this.props;

    if (recipe.steps && recipe.steps.length) {
      return 2;
    }

    if (recipe.ingredients && recipe.ingredients.length) {
      return 1;
    }

    if (recipe.title) {
      return 0;
    }
  };

  state = {
    stage: this.getCompletedStage(),
  };

  handleStageChanged = stage => this.setState({ stage });

  parseIngredientStrings = ingredientStrings => {
    if (!ingredientStrings) {
      return null;
    }

    const ingredientArray = [].concat(ingredientStrings);

    // TODO
    return null;
  };

  parseStepStrings = stepStrings => {
    if (!stepStrings) {
      return null;
    }

    return [].concat(stepStrings);
  };

  parseProvidedData = () => {
    const { externalParams = {} } = this.props;

    return {
      title: path(['ttl'], externalParams),
      description: path(['dsc'], externalParams),
      attribution: path(['att'], externalParams),
      sourceUrl: path(['src'], externalParams),
      ingredients: this.parseIngredientStrings(path(['ing'], externalParams)),
      steps: this.parseStepStrings(path(['stp'], externalParams)),
    };
  };

  handleDetailsSave = recipeId => {
    if (!this.props.recipeId) {
      this.props.onCreate(recipeId);
    }

    this.handleStageChanged(1);
  };

  detailSummary = () => {
    const { recipe } = this.props;
    if (!path(['title'], recipe)) {
      return 'Title, attribution, etc';
    }
    return `${recipe.title} | ${recipe.description.substring(0, 30)}...`;
  };

  ingredientSummary = () => {
    const { recipe } = this.props;
    if (!path(['ingredients'], recipe)) {
      return 'What you need to prepare this recipe';
    }

    return (
      recipe.ingredients
        .slice(0, 3)
        .map(({ ingredient: { name } }) => name)
        .join(', ') + ' ...'
    );
  };

  stepSummary = () => {
    const { recipe } = this.props;
    if (!path(['steps'], recipe)) {
      return 'How to make the food';
    }

    return `${recipe.steps.length} steps`;
  };

  render() {
    const { recipeId, recipe } = this.props;

    const provided = recipe || this.parseProvidedData();

    return (
      <Layout>
        <H1>{recipeId ? recipe.title : 'Submit a Recipe'}</H1>
        <Stages
          stage={this.state.stage}
          onStageChanged={this.handleStageChanged}
          completedStage={this.getCompletedStage()}
        >
          <Stages.Stage
            stageIndex={0}
            title="Basic Details"
            summary={this.detailSummary()}
          >
            <Details
              recipeId={recipeId}
              onSave={this.handleDetailsSave}
              initialValues={pick(
                ['title', 'description', 'attribution', 'sourceUrl'],
                provided,
              )}
            />
          </Stages.Stage>
          <Stages.Stage
            stageIndex={1}
            title="Ingredients &amp; Prep"
            summary={this.ingredientSummary()}
          >
            <Ingredients
              recipeId={recipeId}
              ingredients={path(['ingredients'], provided)}
            />
          </Stages.Stage>
          <Stages.Stage
            stageIndex={2}
            title="Steps &amp; Procedure"
            summary={this.stepSummary()}
          >
            <Steps recipeId={recipeId} steps={path(['steps'], provided)} />
          </Stages.Stage>
        </Stages>
      </Layout>
    );
  }
}
