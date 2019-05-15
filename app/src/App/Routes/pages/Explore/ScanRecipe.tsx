import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { Text } from 'grommet';
import LinkRecipeForm from 'features/recipes/Linker/LinkRecipeForm';
import { parse } from 'query-string';
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

export interface ScanRecipePageProps extends RouteComponentProps<{}> {}

export const ScanRecipePage: FC<ScanRecipePageProps> = ({ location }) => {
  const { url, text, title } = parse(location.search);

  const scanUrl = url || findUrl(text) || findUrl(title);

  return (
    <PageWithActions pageTitle="Scan a web recipe" backPath="/explore">
      <PageContent>
        {(url || text || title) && !scanUrl && (
          <Text>
            The share didn't work. Try copying the URL and pasting it.
          </Text>
        )}
        <LinkRecipeForm prefilledValue={scanUrl || ''} />
      </PageContent>
    </PageWithActions>
  );
};

export default ScanRecipePage;
