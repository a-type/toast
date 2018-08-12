import React from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik } from 'formik';
import { Form, Input, Button, H3, Field } from 'components/generic';
import { merge, pick } from 'ramda';
import styled from 'styled-components';
import { title } from 'change-case';
import DeleteButton from './DeleteButton';
import ParsingInput from './ParsingInput';

const Container = styled.div`
  margin-bottom: var(--spacing-lg);
`;

export const RecipeCreateIngredientFragment = gql`
  fragment RecipeCreateIngredient on RecipeIngredient {
    id
    index
    text
    unit
    unitTextMatch
    value
    valueTextMatch
    ingredientTextMatch
    ingredient {
      id
      name
    }
  }
`;

const UpdateIngredient = gql`
  mutation UpdateIngredient($id: ID!, $input: RecipeIngredientUpdateInput!) {
    updateRecipeIngredient(id: $id, input: $input) {
      ...RecipeCreateIngredient
    }
  }

  ${RecipeCreateIngredientFragment}
`;

const CreateIngredient = gql`
  mutation CreateIngredient(
    $recipeId: ID!
    $input: RecipeIngredientCreateInput!
  ) {
    createRecipeIngredient(recipeId: $recipeId, input: $input) {
      id
      ingredients {
        ...RecipeCreateIngredient
      }
    }
  }

  ${RecipeCreateIngredientFragment}
`;

export class IngredientEditor extends React.PureComponent {
  state = {
    unit: null,
    value: null,
    ingredient: null,
    ingredientData: null,
    valid: false,
    dirty: false,
    loading: false,
    text: '',
    randomKey: `${Math.floor(Math.random() * 10000000)}`,
  };

  componentDidMount() {
    this.reinitialize();
  }

  reinitialize = () => {
    const { recipeIngredient } = this.props;
    if (recipeIngredient) {
      const {
        unit,
        unitTextMatch,
        value,
        valueTextMatch,
        ingredient,
        ingredientTextMatch,
        text,
      } = recipeIngredient;
      this.setState({
        dirty: false,
        loading: false,
        text,
        value: {
          raw: valueTextMatch,
          normalized: value,
        },
        ingredient: {
          raw: ingredientTextMatch,
          normalized: ingredient.name,
        },
        unit: {
          raw: unitTextMatch,
          normalized: unit,
        },
        ingredientData: ingredient,
      });
    } else {
      this.setState({
        loading: false,
        text: '',
        value: null,
        ingredient: null,
        unit: null,
        ingredientData: null,
        randomKey: `${Math.floor(Math.random() * 100000000)}`,
      });
    }
  };

  componentDidUpdate() {
    const { value, unit, ingredient, ingredientData, text } = this.state;
    const { recipeIngredient } = this.props;

    const valid =
      !!value &&
      !!value.normalized &&
      !!ingredient &&
      !!ingredient.raw &&
      !!ingredientData;

    if (!recipeIngredient) {
      this.setState({
        dirty: true,
        valid,
      });
      return;
    }

    const dirty =
      (value && value.raw !== recipeIngredient.valueTextMatch) ||
      (value && value.normalized !== recipeIngredient.value) ||
      (unit && unit.raw !== recipeIngredient.unitTextMatch) ||
      (unit && unit.normalized !== recipeIngredient.unit) ||
      (ingredient && ingredient.raw !== recipeIngredient.ingredientTextMatch) ||
      text !== recipeIngredient.text;

    this.setState({
      valid,
      dirty,
    });
  }

  save = async () => {
    const {
      value,
      unit,
      ingredient,
      ingredientData,
      text,
      valid,
      dirty,
      loading,
    } = this.state;
    const { client, recipeIngredient, recipeId } = this.props;

    if (!dirty || !valid || loading) {
      return;
    }

    this.setState({ loading: true });
    try {
      await client.mutate({
        mutation: recipeIngredient ? UpdateIngredient : CreateIngredient,
        variables: {
          input: {
            text,
            value: value.normalized,
            valueTextMatch: value.raw,
            unit: unit && unit.normalized,
            unitTextMatch: unit && unit.raw,
            ingredientId: ingredientData.id,
            ingredientTextMatch: ingredient.raw,
          },
          id: recipeIngredient && recipeIngredient.id,
          recipeId,
        },
      });
      this.reinitialize();
    } catch (err) {
      this.setState({ loading: false });
    }
  };

  updateParsedValues = parsed => this.setState(parsed);

  updateMatchedIngredient = ingredient =>
    this.setState({ ingredientData: ingredient });

  render() {
    const { recipeIngredient } = this.props;
    const {
      unit,
      value,
      ingredient,
      ingredientData,
      dirty,
      valid,
      loading,
      // randomKey forces a complete re-mount on the ParsingInput to clear
      // state in the editor for the create mode
      randomKey,
    } = this.state;
    const canSave = dirty && valid && !loading;

    return (
      <Container>
        <ParsingInput
          unit={unit}
          value={value}
          ingredient={ingredient}
          ingredientData={ingredientData}
          recipeIngredient={recipeIngredient}
          updateParsedValues={this.updateParsedValues}
          updateMatchedIngredient={this.updateMatchedIngredient}
          key={randomKey}
          onSave={this.save}
        />
        <Button onClick={this.save} disabled={!canSave}>
          {canSave ? 'Save' : loading ? 'Loading' : 'Saved'}
        </Button>
        {recipeIngredient && (
          <DeleteButton ingredientId={recipeIngredient.id} />
        )}
      </Container>
    );
  }
}

export default withApollo(IngredientEditor);
