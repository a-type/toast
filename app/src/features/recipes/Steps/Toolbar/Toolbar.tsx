import * as React from 'react';
import { Bar } from './components';
import { Link, Icon } from 'components/generic';
import { HelpText } from 'components/text';
import { Recipe } from 'generated/schema';
import { Heading, Button } from 'grommet';

export interface ToolbarProps {
  recipe: Recipe;
}

const Toolbar: React.SFC<ToolbarProps> = ({ recipe }) => {
  return (
    <Bar>
      <Link to={`/recipes/${recipe.id}`}>
        <Button icon={<Icon name="next-page" rotation={180} />} />
      </Link>
      <div>
        <HelpText>Cooking</HelpText>
        <Heading margin="0" level="3">
          {recipe.title}
        </Heading>
      </div>
      {/* <div>
        <Button.Icon name="index" />
      </div> */}
      <div>
        <Link to={recipe.sourceUrl} newTab>
          <Button icon={<Icon name="view-more" />} />
        </Link>
      </div>
    </Bar>
  );
};

export default Toolbar;
