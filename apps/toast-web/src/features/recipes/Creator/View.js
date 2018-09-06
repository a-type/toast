import React from 'react';
import Details, { RecipeCreateDetailsFragment } from './Details';
import Ingredients, { RecipeCreateIngredientsFragment } from './Ingredients';
import Steps, { RecipeCreateStepsFragment } from './Steps';
import Images, { RecipeCreateImageFragment } from './Images';
import Publish, { RecipeCreatePublishFragment } from './Publish';
import { Stages } from 'components/generic';
import { H1, Link } from 'components/typeset';
import { PublishedTag } from './components';
import { SingleColumn } from 'components/layouts';
import { pick, path, mergeDeepLeft } from 'ramda';
import gql from 'graphql-tag';

export const RecipeCreateViewFragment = gql`
  fragment RecipeCreateView on Recipe {
    ...RecipeCreateDetails
    ...RecipeCreateIngredients
    ...RecipeCreateSteps
    ...RecipeCreatePublish
    ...RecipeCreateImage
  }

  ${RecipeCreateDetailsFragment}
  ${RecipeCreateIngredientsFragment}
  ${RecipeCreateStepsFragment}
  ${RecipeCreatePublishFragment}
  ${RecipeCreateImageFragment}
`;

export default class RecipeCreator extends React.PureComponent {
  getCompletedStage = () => {
    if (!this.props.recipe) {
      return -1;
    }

    const { recipe } = this.props;

    if (recipe.published) {
      return 3;
    }

    if (
      (recipe.steps && recipe.steps.length) ||
      recipe.displayType === 'LINK'
    ) {
      return 4;
    }

    if (recipe.ingredients && recipe.ingredients.length) {
      return 1;
    }

    if (recipe.title) {
      return 0;
    }
  };

  getStartingStage = () => {
    // if the whole thing is done, just go back to the beginning.
    const completed = this.getCompletedStage();
    if (completed === 4) {
      // encourage users to add an image
      if (!path(['recipe', 'coverImage', 'id'], this.props)) {
        return 3;
      }
      return 0;
    }
    return completed + 1;
  };

  state = {
    stage: this.getStartingStage(),
  };

  handleStageChanged = stage => this.setState({ stage });

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
    return `${recipe.title} ${
      recipe.description ? `| ${recipe.description.substring(0, 30)}...` : ''
    }`;
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

    if (recipe.displayType === 'LINK') {
      return "Linked recipes don't need steps";
    }

    if (!path(['steps'], recipe)) {
      return 'How to make the food';
    }

    return `${recipe.steps.length} steps`;
  };

  publishSummary = () => {
    const { recipe } = this.props;
    if (!path(['published'], recipe)) {
      return 'Make this recipe public';
    }

    return 'Already published';
  };

  imagesSummary = () => {
    const { recipe } = this.props;
    if (!path(['coverImage', 'url'], recipe)) {
      return 'No cover image';
    }

    return 'Cover image supplied';
  };

  renderTitle = () => {
    const { recipe, recipeId } = this.props;

    if (!recipeId) {
      return <H1>Submit a Recipe</H1>;
    }

    if (recipe.published) {
      return (
        <Link to={`/recipes/${recipeId}`}>
          <H1>{recipe.title}</H1>
        </Link>
      );
    }

    return (
      <H1>
        {recipe.title}
        <PublishedTag>Draft</PublishedTag>
      </H1>
    );
  };

  render() {
    const { recipeId, recipe } = this.props;
    const { queryData } = this.state;

    return (
      <SingleColumn headerImage={path(['coverImage'], recipe)}>
        <SingleColumn.Content>
          {this.renderTitle()}
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
                  [
                    'title',
                    'description',
                    'attribution',
                    'sourceUrl',
                    'displayType',
                    'servings',
                    'cookTime',
                    'prepTime',
                    'unattendedTime',
                  ],
                  recipe,
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
                ingredients={path(['ingredients'], recipe)}
              />
            </Stages.Stage>
            <Stages.Stage
              stageIndex={2}
              title="Steps &amp; Procedure"
              summary={this.stepSummary()}
            >
              <Steps recipeId={recipeId} steps={path(['steps'], recipe)} />
            </Stages.Stage>
            <Stages.Stage
              stageIndex={3}
              title="Images"
              summary={this.imagesSummary()}
            >
              <Images
                recipeId={recipeId}
                coverImage={path(['coverImage'], recipe)}
              />
            </Stages.Stage>
            <Stages.Stage
              stageIndex={4}
              title="Publish"
              summary={this.publishSummary()}
            >
              <Publish
                recipeId={recipeId}
                published={path(['published'], recipe)}
              />
            </Stages.Stage>
          </Stages>
        </SingleColumn.Content>
      </SingleColumn>
    );
  }
}
