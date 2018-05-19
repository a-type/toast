import React from 'react';
import Field from 'field-day';
import { withProps } from 'recompose';
import Label from './styles/Label';

const getHtmlFor = children => {
  if (children.props && children.props.id) {
    return ((children.props.id: any): string);
  }
};
const renderLabel = ({ style, fieldProps }) =>
  fieldProps.label && (
    <Label
      style={style}
      htmlFor={fieldProps.fieldId || getHtmlFor(fieldProps.children)}
    >
      {fieldProps.label}
    </Label>
  );

Field.Group = withProps({
  fieldElements: [
    {
      ...Field.Group.defaultFieldElements[0],
      render: renderLabel,
    },
    Field.Group.defaultFieldElements[1],
  ],
})(Field.Group);

export default Field;
