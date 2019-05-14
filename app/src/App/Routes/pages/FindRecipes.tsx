import React from 'react';
import Column from 'components/layout/Column';
import { RouteComponentProps } from 'react-router';
import { Text, Box, Heading, Paragraph } from 'grommet';
import LinkRecipeForm from 'features/recipes/Linker/LinkRecipeForm';
import { parse } from 'query-string';
import { RecipeSearch } from 'features/recipes/RecipeSearch/RecipeSearch';
import { Provider } from 'contexts/RecipeSearchContext';
import { Icon } from 'components/generic';
import PageWithActions, {
  PageContent,
  Actions,
} from 'components/layout/PageWithActions';
import Action from 'components/generic/Action';

const findUrl = (text: string | string[]) => {
  if (text instanceof Array) {
    return text.reduce<string>((match, item) => match || findUrl(item), null);
  }
  console.debug(`Searching for URL in ${text}`);
  const res = /(https?:\/\/.*)\s?/.exec(text);
  return (res && res[1]) || null;
};

export const ScanRecipe = ({ location }: RouteComponentProps<{}>) => {
  const { url, text, title } = parse(location.search);

  const scanUrl = url || findUrl(text) || findUrl(title);

  return (
    <Box margin={{ bottom: 'large' }}>
      <Heading level="2">
        <Icon name="link" /> Add a Web Recipe
      </Heading>
      {(url || text || title) && !scanUrl && (
        <Text>The share didn't work. Try copying the URL and pasting it.</Text>
      )}
      <LinkRecipeForm prefilledValue={scanUrl || ''} />
    </Box>
  );
};

export const SearchRecipe = () => {
  return (
    <Box margin={{ bottom: 'large' }}>
      <Heading level="2">
        <Icon name="search" /> Search Recipes
      </Heading>
      <Paragraph>
        Search other recipes our users have discovered from all over the
        internet.
      </Paragraph>
      <RecipeSearch />
    </Box>
  );
};

export default (props: RouteComponentProps<{}>) => (
  <Provider>
    <PageWithActions pageTitle="Explore">
      <Actions>
        <Action to="/recipes" icon="bookmarks">
          Your collection
        </Action>
        <Action to="/recipes/create" icon="add">
          Add your own recipe
        </Action>
      </Actions>
      <PageContent>
        <ScanRecipe {...props} />
        <SearchRecipe />
      </PageContent>
    </PageWithActions>
  </Provider>
);
