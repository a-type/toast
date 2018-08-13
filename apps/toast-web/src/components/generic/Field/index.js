import React from 'react';
import { Container } from './components';
import HelpText from '../HelpText';
import Label from '../Label';

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
