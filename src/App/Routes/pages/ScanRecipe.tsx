import React from 'react';
import Column from 'components/layout/Column';
import { RouteComponentProps } from 'react-router';
import { Text } from 'grommet';
import LinkRecipeForm from 'features/recipes/Linker/LinkRecipeForm';
import { parse } from 'query-string'

const findUrl = (text: string | string[]) => {
  if (text instanceof Array) {
    return text.reduce<string>((match, item) => match || findUrl(item), null);
  }
  const res = /(https?:\/\/.*)\s/.exec(text);
  return res && res[1] || null;
};

export default ({
  location
}: RouteComponentProps<{}>) => {
  const { url, text, title } = parse(location.search);

  const scanUrl = url || findUrl(text) || findUrl(title);

  return (
    <Column>
      {!scanUrl && (
        <Text>The share didn't work. Try copying the URL and pasting it.</Text>
      )}
      <LinkRecipeForm prefilledValue={scanUrl || ''} />
    </Column>
  );
};
