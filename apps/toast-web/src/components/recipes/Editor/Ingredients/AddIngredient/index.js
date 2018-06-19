// @flow
import React from 'react';
import { Icon, Form } from 'components/generic';
import { Button, Input } from 'components/typeset';
import IngredientPicker from 'components/ingredients/Picker';
import Layout from '../IngredientField/Layout';
import { Formik } from 'formik';

type Props = {
  onAdd({ ingredientId: string, unit: string, unitValue: number }): mixed,
};

type State = {
  active: boolean,
};

export default class AddIngredient extends React.PureComponent<Props, State> {
  state = {
    active: false,
  };

  handleSubmit = async values => {
    await this.props.onAdd({
      ingredientId: values.ingredient.id,
      unit: values.unit,
      unitValue: values.unitValue,
    });

    this.setState({ active: false });
  };

  toggleActive = () => this.setState(({ active }) => ({ active: !active }));

  renderForm = ({
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  }) => (
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
    const { active } = this.state;

    if (!active) {
      return (
        <Button.Ghost onClick={this.toggleActive}>Add ingredient</Button.Ghost>
      );
    }

    return (
      <Formik
        initialValues={{
          unitValue: 0,
          unit: '',
          ingredient: null,
        }}
        onSubmit={this.handleSubmit}
      >
        {this.renderForm}
      </Formik>
    );
  }
}
