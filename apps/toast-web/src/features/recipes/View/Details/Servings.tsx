import React from 'react';
import { Paragraph } from 'grommet';

export default ({ servings }) => {
  return (
    <Paragraph>
      <span>Servings: {servings}</span>
    </Paragraph>
  );
};
