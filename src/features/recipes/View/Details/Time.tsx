import React from 'react';
import { HelpText } from 'components/text';

export default ({ cookTime, prepTime, unattendedTime }) => {
  if (!cookTime && !prepTime && !unattendedTime) {
    return null;
  }

  if (cookTime && !prepTime && !unattendedTime) {
    return <HelpText>{cookTime} min</HelpText>;
  }

  if (cookTime && unattendedTime) {
    return (
      <HelpText>
        {unattendedTime} min unattended + {cookTime} min active
      </HelpText>
    );
  }

  if (prepTime && cookTime) {
    return (
      <HelpText>
        {prepTime} min prep + {cookTime} min cooking
      </HelpText>
    );
  }

  return (
    <HelpText>
      {prepTime} min prep, {unattendedTime} min unattended, {cookTime} min
      cooking
    </HelpText>
  );
};
