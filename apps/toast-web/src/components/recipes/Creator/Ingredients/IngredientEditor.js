import React from 'react';
import { Mutation } from 'react-apollo';
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

export default class IngredientEditor extends React.PureComponent {
  render() {
    const { ingredient } = this.props;

    return (
      <Mutation mutation={UpdateIngredient}>
        {save => (
          <Container>
            <ParsingInput
              save={values =>
                save({ variables: { input: values, id: ingredient.id } })
              }
              ingredient={ingredient}
            />
            <DeleteButton ingredientId={ingredient.id} />
          </Container>
        )}
      </Mutation>
    );
  }
}
