import React from 'react';
import { Container } from './components';
import { Label, HelpText } from 'components/typeset';

export default ({ children, label, helpText, required }) => (
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
