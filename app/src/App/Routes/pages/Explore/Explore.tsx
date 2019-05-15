import React, { FC } from 'react';
import { Text, Box, Heading, Paragraph } from 'grommet';
import { RecipeSearch } from 'features/recipes/RecipeSearch/RecipeSearch';
import { Provider } from 'contexts/RecipeSearchContext';
import PageWithActions, {
  PageContent,
  Actions,
} from 'components/layout/PageWithActions';
import Action from 'components/generic/Action';

export interface ExplorePageProps {}

export const ExplorePage: FC<ExplorePageProps> = ({}) => {
  return (
    <Provider>
      <PageWithActions pageTitle="Explore recipes">
        <Actions>
          <Action to="/explore/scan" icon="link">
            Scan a recipe web page
          </Action>
          <Action to="/recipes/create" icon="add">
            Add your own recipe
          </Action>
        </Actions>
        <PageContent>
          <Paragraph>
            Search other recipes our users have discovered from all over the
            internet.
          </Paragraph>
          <RecipeSearch />
        </PageContent>
      </PageWithActions>
    </Provider>
  );
};

export default ExplorePage;
