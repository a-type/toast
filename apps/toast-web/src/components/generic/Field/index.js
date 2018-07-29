import React from 'react';
import { Label, Container, HelpText } from './components';

export default ({ children, label, helpText, required }) => (
  <Container>
    {label && (
      <Label>
        {label}
        {!required && ' (optional)'}
      </Label>
    )}
    {helpText && <HelpText>{helpText}</HelpText>}
    {children}
  </Container>
);
