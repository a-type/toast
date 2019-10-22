import React from 'react';
import { Typography } from '@material-ui/core';
import LinkRecipeForm from 'components/recipes/LinkRecipeForm';
import { ensureLoggedIn } from 'lib/auth';

const findUrl = (text: string | string[]) => {
  if (text instanceof Array) {
    return text.reduce<string>((match, item) => match || findUrl(item), null);
  }
  const res = /(https?:\/\/.*)\s?/.exec(text);
  return (res && res[1]) || null;
};

const ScanPage = ({
  url,
  text,
  title,
}: {
  url?: string;
  text?: string;
  title?: string;
}) => {
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

ScanPage.getInitialProps = async ctx => {
  await ensureLoggedIn(ctx);
  return ctx.query;
};

export default ScanPage;
