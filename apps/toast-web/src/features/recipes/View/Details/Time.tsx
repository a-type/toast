import React from 'react';
import { Aside } from 'components/typeset';

export default ({ cookTime, prepTime, unattendedTime }) => {
  if (!cookTime && !prepTime && !unattendedTime) {
    return null;
  }

  if (cookTime && !prepTime && !unattendedTime) {
    return <Aside>{cookTime} min</Aside>;
  }

  if (cookTime && unattendedTime) {
    return (
      <Aside>
        {unattendedTime} min unattended + {cookTime} min active
      </Aside>
    );
  }

  if (prepTime && cookTime) {
    return (
      <Aside>
        {prepTime} min prep + {cookTime} min cooking
      </Aside>
    );
  }

  return (
    <Aside>
      {prepTime} min prep, {unattendedTime} min unattended, {cookTime} min
      cooking
    </Aside>
  );
};
