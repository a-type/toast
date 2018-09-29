import React, { createRef } from 'react';
import { Input, Field, Button } from 'components/generic';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import gql from 'fraql';
import { path } from 'ramda';

export const ParseIngredientFragment = gql`
  fragment ParseIngredient on RecipeIngredient {
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

const ParseIngredient = gql`
  mutation ParseIngredient($recipeId: ID!, $text: String!) {
    addRecipeIngredient(recipeId: $recipeId, input: { text: $text }) {
      id
      ingredients {
        ${ParseIngredientFragment}
      }
    }
  }
`;

const ReparseIngredient = gql`
  mutation ReparseIngredient($id: ID!, $text: String!) {
    reparseRecipeIngredient(id: $id, input: { text: $text }) {
      ${ParseIngredientFragment}
    }
  }
`;

export default class IngredientEditorParser extends React.PureComponent {
  inputRef = createRef();

  render() {
    const { recipeIngredient, recipeId, onParsed } = this.props;

    const initialValues = {
      text: recipeIngredient ? recipeIngredient.text : '',
    };

    return (
      <Mutation
        mutation={recipeIngredient ? ReparseIngredient : ParseIngredient}
      >
        {parse => (
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, { resetForm }) => {
              await parse({
                variables: {
                  ...values,
                  id: path(['id'], recipeIngredient),
                  recipeId,
                },
              });
              resetForm();
              if (this.inputRef.current) {
                this.inputRef.current.focus();
              }
              onParsed();
            }}
          >
            {({ values, handleChange, handleSubmit, dirty }) => (
              <form onSubmit={handleSubmit}>
                <Field label="Add an ingredient line item" required>
                  <Input
                    value={values.text}
                    name="text"
                    required
                    onChange={handleChange}
                    innerRef={this.inputRef}
                  />
                </Field>
                <Field>
                  <Button type="submit" disabled={!dirty}>
                    Save
                  </Button>
                </Field>
              </form>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }
}
