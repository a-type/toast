import React from 'react';
import { HelpText } from 'components/text';

export default ({ cookTime, prepTime, unattendedTime }) => {
  if (!cookTime && !prepTime && !unattendedTime) {
    return null;
  }

  if (cookTime && !prepTime && !unattendedTime) {
    return <HelpText margin={{ bottom: 'medium' }}>{cookTime} min</HelpText>;
  }

  if (cookTime && unattendedTime) {
    return (
      <HelpText margin={{ bottom: 'medium' }}>
        {unattendedTime} min unattended + {cookTime} min active
      </HelpText>
    );
  }

  if (prepTime && cookTime) {
    return (
      <HelpText margin={{ bottom: 'medium' }}>
        {prepTime} min prep + {cookTime} min cooking
      </HelpText>
    );
  }

  return (
    <HelpText margin={{ bottom: 'medium' }}>
      {prepTime} min prep, {unattendedTime} min unattended, {cookTime} min
      cooking
    </HelpText>
  );
};
