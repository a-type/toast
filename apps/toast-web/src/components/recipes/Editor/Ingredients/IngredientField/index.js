// @flow
import React from 'react';
import { type RecipeIngredient } from 'types';
import { Form, Input, Button, Loader } from 'components/generic';
import Layout from './Layout';
import IngredientPicker from 'components/ingredients/Picker';
import { Formik } from 'formik';
import SideControls from '../../common/SideControls';

type Props = {
  index: number,
  ingredient: RecipeIngredient,
  onChange({ ingredientId: string, unit: string, unitValue: number }): mixed,
};

export default class IngredientField extends React.PureComponent<Props> {
  handleSubmit = async values => {
    await this.props.onChange({
      id: this.props.ingredient.id,
      unit: values.unit,
      unitValue: values.unitValue,
    });
  };

  renderForm = ({ values, errors, handleChange, handleBlur, handleSubmit }) => (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Field.Group columns={7}>
          <Form.Field columnSpan={1} label="Quantity">
            <Input
              name="unitValue"
              type="number"
              value={values.unitValue}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ width: '100%' }}
            />
          </Form.Field>
          <Form.Field columnSpan={3} label="Units">
            <Input
              name="unit"
              value={values.unit}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Field columnSpan={3} label="Ingredient">
            <IngredientPicker
              name="ingredient"
              disabled
              value={values.ingredient}
            />
          </Form.Field>
        </Form.Field.Group>
      </Form>
      <SideControls>
        <Form.AutoSave
          values={values}
          onSave={this.handleSubmit}
          render={({ isSaving }) => isSaving && <Loader size="30px" />}
        />
      </SideControls>
    </React.Fragment>
  );

  render() {
    const { ingredient } = this.props;

    return (
      <Formik
        initialValues={{
          unit: ingredient.unit,
          unitValue: ingredient.unitValue,
          ingredient: ingredient.ingredient,
        }}
        onSubmit={this.handleSubmit}
      >
        {this.renderForm}
      </Formik>
    );
  }
}
