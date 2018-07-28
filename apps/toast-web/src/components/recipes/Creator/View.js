import React from 'react';
import Details, { RecipeCreateDetailsFragment } from './Details';
import { Stages, H1 } from 'components/generic';
import { Layout } from './components';
import { pick } from 'ramda';
import gql from 'graphql-tag';

export const RecipeCreateViewFragment = gql`
  fragment RecipeCreateView on Recipe {
    ...RecipeCreateDetails
  }

  ${RecipeCreateDetailsFragment}
`;

export default class RecipeCreator extends React.PureComponent {
  state = {
    stage: 0,
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
    const { externalParams } = this.props;

    return {
      title: externalParams.ttl,
      description: externalParams.dsc,
      attribution: externalParams.att,
      sourceUrl: externalParams.src,
      ingredients: this.parseIngredientStrings(externalParams.ing),
      steps: this.parseStepStrings(externalParams.stp),
    };
  };

  handleDetailsSave = recipeId => {
    if (!this.props.recipeId) {
      this.props.onCreate(recipeId);
    }

    this.handleStageChanged(1);
  };

  getCompletedStage = () => {
    if (!this.props.recipeId) {
      return -1;
    }

    const { recipe } = this.props;

    if (recipe.steps) {
      return 2;
    }

    if (recipe.ingredients) {
      return 1;
    }

    if (recipe.title) {
      return 0;
    }
  };

  detailSummary = () => {
    const { recipe } = this.props;
    if (!recipe.title) {
      return 'Title, attribution, etc';
    }
    return `${recipe.title} | ${recipe.description.substring(0, 30)}...`;
  };

  ingredientSummary = () => {
    const { recipe } = this.props;
    if (!recipe.ingredients) {
      return 'What you need to prepare this recipe';
    }

    return (
      recipe.ingredients
        .slice(0, 3)
        .map(({ ingredient: { name } }) => name)
        .join(', ') + ' ...'
    );
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
            <div>foo</div>
          </Stages.Stage>
        </Stages>
      </Layout>
    );
  }
}
