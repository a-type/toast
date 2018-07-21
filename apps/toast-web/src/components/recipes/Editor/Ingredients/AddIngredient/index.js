// @flow
import React from 'react';
import { Icon, Form } from 'components/generic';
import { Button, Input } from 'components/typeset';
import IngredientPicker from 'components/ingredients/Picker';
import Layout from '../IngredientField/Layout';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CreateIngredient = gql`
  mutation CreateRecipeIngredient(
    $recipeId: ID!
    $input: RecipeIngredientCreateInput!
  ) {
    createRecipeIngredient(recipeId: $recipeId, input: $input) {
      id
      index
      unit
      unitValue
      note
      ingredient {
        id
        name
      }
    }
  }
`;

type Props = {
  recipeId: string,
};

type State = {
  active: boolean,
};

export default class AddIngredient extends React.PureComponent<Props, State> {
  state = {
    active: false,
  };

  toggleActive = () => this.setState(({ active }) => ({ active: !active }));

  renderForm = ({
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  }: any) => (
    <Form onSubmit={handleSubmit}>
      <Form.Field.Group columns={9}>
        <Form.Field columnSpan={1} label="Quantity">
          <Input
            type="number"
            name="unitValue"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.unitValue}
            style={{ width: '100%' }}
          />
        </Form.Field>
        <Form.Field columnSpan={3} label="Units">
          <Input
            type="text"
            name="unit"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.unit}
          />
        </Form.Field>
        <Form.Field columnSpan={3} label="Ingredient">
          <IngredientPicker
            value={values.ingredient}
            onChange={ingredient => setFieldValue('ingredient', ingredient)}
            onBlur={handleBlur}
            canCreate
            onCreate={handleChange}
          />
        </Form.Field>
        <Form.Field columnSpan={1} align="center">
          <Button.Icon onClick={this.toggleActive} name="delete-button" />
        </Form.Field>
        <Form.Field columnSpan={1} align="center">
          <Button.Icon type="submit" name="create" />
        </Form.Field>
      </Form.Field.Group>
    </Form>
  );

  render() {
    const { recipeId } = this.props;
    const { active } = this.state;

    if (!active) {
      return (
        <Button.Ghost onClick={this.toggleActive}>Add ingredient</Button.Ghost>
      );
    }

    return (
      <Mutation mutation={CreateIngredient}>
        {createIngredient => (
          <Formik
            initialValues={{
              unitValue: 0,
              unit: '',
              ingredient: null,
            }}
            onSubmit={async ({ values }) => {
              await createIngredient({
                variables: {
                  recipeId,
                  input: {
                    ingredientId: values.ingredient.id,
                    unit: values.unit,
                    unitValue: values.unitValue,
                    note: values.note,
                  },
                },
              });
              this.setState({ active: false });
            }}
          >
            {this.renderForm}
          </Formik>
        )}
      </Mutation>
    );
  }
}
