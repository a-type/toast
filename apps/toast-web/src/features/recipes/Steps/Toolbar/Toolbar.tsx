import * as React from 'react';
import { Bar } from './components';
import { Button, Link } from 'components/generic';
import { H3, HelpText } from 'components/typeset';
import { Controls } from 'components/layout';
import { Recipe } from 'generated/schema';

export interface ToolbarProps {
  recipe: Recipe;
}

const Toolbar: React.SFC<ToolbarProps> = ({ recipe }) => {
  return (
    <Controls>
      <Bar>
        <Link to={`/recipes/${recipe}`}>
          <Button.Icon name="next-page" iconProps={{ rotation: 180 }} />
        </Link>
        <div>
          <HelpText>Cooking</HelpText>
          <H3>{recipe.title}</H3>
        </div>
        <div>
          <Button.Icon name="index" />
        </div>
      </Bar>
    </Controls>
  );
};

export default Toolbar;
