import React from 'react';
import Field from 'field-day';
import { withProps } from 'recompose';
import Label from './styles/Label';

const getHtmlFor = children => {
  if (children.props && children.props.id) {
    return children.props.id;
  }
};
const renderLabel = ({ gridArea, fieldProps }) =>
  fieldProps.label && (
    <Label
      style={{ gridArea }}
      htmlFor={fieldProps.fieldId || getHtmlFor(fieldProps.children)}
    >
      {fieldProps.label}
    </Label>
  );

const renderContent = ({ gridArea, fieldProps }) =>
  fieldProps.children && (
    <div style={{ gridArea, marginBottom: 'var(--spacing-sm)' }}>
      {fieldProps.children}
    </div>
  );

Field.Group = withProps({
  fieldElements: [
    {
      ...Field.Group.defaultFieldElements[0],
      render: renderLabel,
    },
    {
      ...Field.Group.defaultFieldElements[1],
      render: renderContent,
    },
  ],
})(Field.Group);

export default Field;
