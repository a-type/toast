import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik } from 'formik';
import { Form, Input, Button, H3 } from 'components/generic';
import { merge, pick } from 'ramda';
import styled from 'styled-components';
import { title } from 'change-case';

const Container = styled.div`
  margin-bottom: var(--spacing-lg);
`;

export const RecipeCreateIngredientFragment = gql`
  fragment RecipeCreateIngredient on RecipeIngredient {
    id
    unit
    unitValue
    note
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

export default ({ ingredient }) => {
  const defaultValues = merge(
    {
      unit: '',
      unitValue: 1,
      note: '',
    },
    pick(['unit', 'unitValue', 'note'], ingredient),
  );

  return (
    <Container>
      <Mutation mutation={UpdateIngredient}>
        {save => (
          <Formik
            initialValues={defaultValues}
            enableReinitialize
            onSubmit={async values => {
              await save({
                variables: {
                  id: ingredient.id,
                  input: values,
                },
              });
            }}
          >
            {({ values, handleSubmit, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <H3>{title(ingredient.ingredient.name)}</H3>
                <Form.Field.Group columns={2}>
                  <Form.Field label="How much?">
                    <Input
                      type="number"
                      value={values.unitValue}
                      onChange={handleChange}
                      name="unitValue"
                    />
                  </Form.Field>
                  <Form.Field label="Unit Type (e.g., 'cups')">
                    <Input
                      value={values.unit}
                      onChange={handleChange}
                      name="unit"
                    />
                  </Form.Field>
                  <Form.Field label="Notes" columnSpan={2}>
                    <Input.Block
                      value={values.note}
                      onChange={handleChange}
                      name="note"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button type="submit">Save</Button>
                  </Form.Field>
                </Form.Field.Group>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    </Container>
  );
};
