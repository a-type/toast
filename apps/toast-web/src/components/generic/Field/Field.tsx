import React from 'react';
import { Container } from './components';
import { Label, HelpText } from 'components/text';

export interface FieldProps {
  children: React.ReactNode;
  label?: string;
  helpText?: string;
  required?: boolean;
}

const Field: React.SFC<FieldProps> = ({
  children,
  label,
  helpText,
  required,
}) => (
  <Container>
    {label && (
      <Label spaceBelow="sm">
        {label}
        {!required && ' (optional)'}
      </Label>
    )}
    {helpText && <HelpText spaceBelow="sm">{helpText}</HelpText>}
    {children}
  </Container>
);

export default Field;
