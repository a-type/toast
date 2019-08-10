import React, { FC } from 'react';
import { Typography, Container } from '@material-ui/core';
import { NavTabs } from 'components/layout/NavTabs';
import LinkRecipeForm from 'components/features/recipes/LinkRecipeForm';
import { parse } from 'query-string';
import useRouter from 'use-react-router';
import { Center } from 'components/layout/Center';
import { FindInPageTwoTone } from '@material-ui/icons';

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
      <Center title="Scan a recipe" Icon={FindInPageTwoTone}>
        <LinkRecipeForm prefilledValue={scanUrl || ''} />
      </Center>
    </>
  );
};

export const ExplorePage: FC = () => {
  return <Scan />;
};
