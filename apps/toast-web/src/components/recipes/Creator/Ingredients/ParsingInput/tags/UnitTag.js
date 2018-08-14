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

const UnitEditor = ({ initialValue, save }) => (
  <Formik
    onSubmit={values => save(values.unit)}
    initialValues={{ unit: initialValue }}
    enableReinitialize
  >
    {({ values, handleChange, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Field label="Unit type" required>
          <Input
            required
            value={values.unit}
            onChange={handleChange}
            name="value"
          />
        </Field>
        <Button type="submit">Save</Button>
      </form>
    )}
  </Formik>
);

export default class UnitTag extends React.PureComponent<Props> {
  render() {
    const { value, onChange } = this.props;

    return (
      <EditableTag
        value={value}
        onChange={onChange}
        name="unit"
        color="positive-dark"
        renderEditor={(currentValue, save) => (
          <UnitEditor initialValue={currentValue} save={save} />
        )}
      />
    );
  }
}
