import React from 'react';
import Details from './Details';
import { Stages, H1 } from 'components/generic';
import { Layout } from './components';
import { pick } from 'ramda';

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

  handleRecipeCreate = recipeId => {
    this.props.onCreate(recipeId);
    this.handleStageChanged(1);
  };

  render() {
    const { recipeId } = this.props;

    const provided = this.parseProvidedData();

    return (
      <Layout>
        <H1>{recipeId ? 'Update Recipe' : 'Submit a Recipe'}</H1>
        <Stages
          stage={this.state.stage}
          onStageChanged={this.handleStageChanged}
        >
          <Stages.Stage
            stageIndex={0}
            title="Basic Details"
            summary="Basic information about this recipe"
          >
            <Details
              recipeId={recipeId}
              onCreate={this.handleRecipeCreate}
              initialValues={pick(
                ['title', 'description', 'attribution', 'sourceUrl'],
                provided,
              )}
            />
          </Stages.Stage>
          <Stages.Stage
            stageIndex={1}
            title="Ingredients &amp; Prep"
            summary="What you need to prepare this recipe"
          >
            <div>foo</div>
          </Stages.Stage>
        </Stages>
      </Layout>
    );
  }
}
