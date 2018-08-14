// @flow

import React from 'react';
import EditableTag from './EditableTag';
import { toReadableFraction } from 'readable-fractions';
import { Formik } from 'formik';
import { Field, Input, Button } from 'components/generic';

type Props = {
  value: string,
  onChange(value: string): mixed,
};

const ValueEditor = ({ initialValue, save }) => (
  <Formik
    onSubmit={values => save(values.value)}
    initialValues={{ value: initialValue }}
    enableReinitialize
  >
    {({ values, handleChange, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Field label="Numeric quantity" required>
          <Input
            required
            type="number"
            value={values.value}
            onChange={handleChange}
            name="value"
          />
        </Field>
        <Button type="submit">Save</Button>
      </form>
    )}
  </Formik>
);

export default class ValueTag extends React.PureComponent<Props> {
  render() {
    const { value, onChange } = this.props;

    return (
      <EditableTag
        value={value}
        onChange={onChange}
        name="quantity"
        color="positive"
        renderDisplayValue={val => toReadableFraction(val, true)}
        renderEditor={(currentValue, save) => (
          <ValueEditor initialValue={currentValue} save={save} />
        )}
      />
    );
  }
}
