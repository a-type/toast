import * as React from 'react';
import { Bar } from './components';
import { Link, Icon } from 'components/generic';
import { HelpText, Heading } from 'components/text';
import { Button } from 'grommet';

export interface ToolbarProps {
  recipe: {
    id: string;
    title: string;
    sourceUrl: string;
  };
}

const Toolbar: React.SFC<ToolbarProps> = ({ recipe }) => {
  return (
    <Bar>
      <Link to={`/recipes/${recipe.id}`}>
        <Button icon={<Icon name="arrow_downward" rotation={90} />} />
      </Link>
      <div>
        <HelpText>Cooking</HelpText>
        <Heading css={{ margin: '0' }} level="3">
          {recipe.title}
        </Heading>
      </div>
      {/* <div>
        <Button.Icon name="index" />
      </div> */}
      <div>
        <Link to={recipe.sourceUrl} newTab>
          <Button icon={<Icon name="link" size="24px" />} />
        </Link>
      </div>
    </Bar>
  );
};

export default Toolbar;
