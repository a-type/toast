// @flow

import React from 'react';
import EditableTag from './EditableTag';
import { toReadableFraction } from 'readable-fractions';
import { Formik } from 'formik';
import { Field, Input, Button } from 'components/generic';

type Props = {
  value: string,
  onChangeSelection(): mixed,
};

export default class ValueTag extends React.PureComponent<Props> {
  render() {
    const { value, onChangeSelection } = this.props;

    return (
      <EditableTag color="positive" onChangeSelection={onChangeSelection}>
        {toReadableFraction(value, true)}
      </EditableTag>
    );
  }
}
