import React, { FC } from 'react';
import { RecipeSearch } from 'features/recipes/RecipeSearch/RecipeSearch';
import { Provider } from 'contexts/RecipeSearchContext';
import { Typography } from '@material-ui/core';
import { NavTabs } from 'components/layout/NavTabs';
import LinkRecipeForm from 'features/recipes/Linker/LinkRecipeForm';
import { parse } from 'query-string';
import useRouter from 'use-react-router';

const findUrl = (text: string | string[]) => {
  if (text instanceof Array) {
    return text.reduce<string>((match, item) => match || findUrl(item), null);
  }
  const res = /(https?:\/\/.*)\s?/.exec(text);
  return (res && res[1]) || null;
};

export const Scan: FC = ({}) => {
  const { location } = useRouter();
  const { url, text, title } = parse(location.search);

  const scanUrl = url || findUrl(text) || findUrl(title);

  return (
    <>
      {(url || text || title) && !scanUrl && (
        <Typography>
          The share didn't work. Try copying the URL and pasting it.
        </Typography>
      )}
      <LinkRecipeForm prefilledValue={scanUrl || ''} />
    </>
  );
};

export const Search: FC = ({}) => {
  return (
    <Provider>
      <RecipeSearch />
    </Provider>
  );
};

export const ExplorePage: FC = () => {
  const paths = [
    {
      path: '/explore',
      exact: true,
    },
    {
      path: '/explore/scan',
    },
  ];

  return (
    <NavTabs paths={paths} tabLabels={['Explore', 'Scan']}>
      <Search />
      <Scan />
    </NavTabs>
  );
};
