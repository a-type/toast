// @flow
import React from 'react';
import { Formik } from 'formik';
import { Form, Input, Button } from 'components/generic';
import Layout from '../common/Layout';
import Number from '../common/Number';

type Props = {
  recipeId: string,
  onCreate({ text: string }): mixed,
  index: number,
};

type State = {
  active: boolean,
};

export default class AddStep extends React.Component<Props, State> {
  state = {
    active: false,
  };

  toggleActive = () => this.setState(({ active }) => ({ active: !active }));

  render() {
    const { recipeId, onCreate, index } = this.props;
    const { active } = this.state;

    if (!active) {
      return <Button.Ghost onClick={this.toggleActive}>Add step</Button.Ghost>;
    }

    return (
      <Formik
        onSubmit={async (values, { setErrors, setSubmitting, setValues }) => {
          setSubmitting(true);
          await onCreate({ text: values.text });
          setSubmitting(false);
        }}
      >
        {({ values = {}, errors, handleChange, handleSubmit, handleBlur }) => (
          <Form onSubmit={handleSubmit}>
            <Layout>
              <Number>{index + 1}</Number>
              <Form.Field.Group columns={1}>
                <Form.Field>
                  <Input.Block
                    value={values.text}
                    name="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Field>
                <Form.Field>
                  <Button type="submit">Add step</Button>
                </Form.Field>
              </Form.Field.Group>
            </Layout>
          </Form>
        )}
      </Formik>
    );
  }
}
