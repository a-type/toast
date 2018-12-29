import * as React from 'react';
import { Bar } from './components';
import { Button, Link } from 'components/generic';
import { H3, HelpText } from 'components/typeset';
import { Recipe } from 'generated/schema';

export interface ToolbarProps {
  recipe: Recipe;
}

const Toolbar: React.SFC<ToolbarProps> = ({ recipe }) => {
  return (
    <Bar>
      <Link to={`/recipes/${recipe}`}>
        <Button.Icon name="next-page" iconProps={{ rotation: 180 }} />
      </Link>
      <div>
        <HelpText>Cooking</HelpText>
        <H3>{recipe.title}</H3>
      </div>
      {/* <div>
        <Button.Icon name="index" />
      </div> */}
      <div>
        <Link to={recipe.sourceUrl} newTab>
          <Button.Icon name="view-more" />
        </Link>
      </div>
    </Bar>
  );
};

export default Toolbar;
