import React, { FC } from 'react';
import useRouter from 'use-react-router';
import { parse } from 'querystring';
import { Typography } from '@material-ui/core';
import { Center } from 'components/layout/Center';
import { FindInPageTwoTone } from '@material-ui/icons';
import LinkRecipeForm from 'components/features/recipes/LinkRecipeForm';

const findUrl = (text: string | string[]) => {
  if (text instanceof Array) {
    return text.reduce<string>((match, item) => match || findUrl(item), null);
  }
  const res = /(https?:\/\/.*)\s?/.exec(text);
  return (res && res[1]) || null;
};

export const ScanPage: FC = ({}) => {
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
