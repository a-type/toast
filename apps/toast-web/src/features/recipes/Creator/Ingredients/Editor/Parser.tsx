import React, { createRef } from 'react';
import { Input, Field, Button } from 'components/generic';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { path } from 'ramda';
import { RecipeIngredient } from 'generated/schema';

export const ParseIngredientFragment = gql`
  fragment ParseIngredient on RecipeIngredient {
    id
    index
    text
    unit
    unitStart
    unitEnd
    value
    valueStart
    valueEnd
    ingredientStart
    ingredientEnd
    ingredient {
      id
      name
    }
  }
`;

const DoParseIngredient = gql`
  mutation DoParseIngredient($recipeId: ID!, $text: String!) {
    addRecipeIngredient(recipeId: $recipeId, input: { text: $text }) {
      id
      ingredients {
        ...ParseIngredient
      }
    }
  }

  ${ParseIngredientFragment}
`;

const DoReparseIngredient = gql`
  mutation DoReparseIngredient($id: ID!, $text: String!) {
    reparseRecipeIngredient(id: $id, input: { text: $text }) {
      ...ParseIngredient
    }
  }

  ${ParseIngredientFragment}
`;

export interface IngredientEditorParserProps {
  recipeIngredient: RecipeIngredient;
  recipeId: string;
  onParsed?(): void;
}

export default class IngredientEditorParser extends React.PureComponent<
  IngredientEditorParserProps
> {
  inputRef = createRef<HTMLInputElement>();

  render() {
    const { recipeIngredient, recipeId, onParsed } = this.props;

    const initialValues = {
      text: recipeIngredient ? recipeIngredient.text : '',
    };

    return (
      <Mutation
        mutation={recipeIngredient ? DoReparseIngredient : DoParseIngredient}
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
                    ref={this.inputRef as any}
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
