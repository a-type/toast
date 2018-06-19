// @flow
import React from 'react';
import { type RecipeStep } from 'types';
import { Formik } from 'formik';
import { Form, Loader } from 'components/generic';
import { Input, Button } from 'components/typeset';
import Layout from '../common/Layout';
import Number from '../common/Number';

type Props = {
  index: number,
  step: RecipeStep,
  onChange({ id: string, text: string }): mixed,
};

export default class StepField extends React.Component<Props> {
  toggleEditable = () =>
    this.setState(({ editable }) => ({ editable: !editable }));

  handleSubmit = async values => {
    await this.props.onChange({
      id: this.props.step.id,
      text: values.text,
    });

    this.setState({ editable: false });
  };

  renderForm = ({ values, errors, handleChange, handleBlur, handleSubmit }) => (
    <Layout>
      <Number>
        {(this.props.step.index && this.props.step.index + 1) || 1}
      </Number>
      <Form onSubmit={handleSubmit}>
        <Form.Field.Group columns={1}>
          <Form.Field lable="Step">
            <Input.Block
              name="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.text}
            />
          </Form.Field>
        </Form.Field.Group>
        <Form.AutoSave
          values={values}
          onSave={this.handleSubmit}
          render={({ isSaving }) => isSaving && <Loader.Linear />}
        />
      </Form>
    </Layout>
  );

  render() {
    const { step } = this.props;

    return (
      <Formik
        initialValues={{ text: step.step.text }}
        onSubmit={this.handleSubmit}
      >
        {this.renderForm}
      </Formik>
    );
  }
}
