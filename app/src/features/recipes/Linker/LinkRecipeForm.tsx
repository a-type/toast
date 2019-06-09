import React, { useState, FC } from 'react';
import logger from 'logger';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { useLinker } from 'contexts/LinkerContext';
import useMedia from 'hooks/useMedia';
import { Typography, Button, Dialog, Box, TextField } from '@material-ui/core';
import Loader from 'components/generic/Loader';
import Icon from 'components/generic/Icon';
import Link from 'components/generic/Link';

const MESSAGES = {
  EXPLANATION:
    'Our computers will do their best to read the recipe on the webpage you provide and add it to your collection. Just enter a valid URL below.',
  UNKNOWN_ERROR:
    "Something went wrong when we tried to scan this recipe. If trying again doesn't work, feel free to reach out.",
};

const UninstalledMessage = () => (
  <Typography>{MESSAGES.EXPLANATION}</Typography>
);

const InstalledMessage = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div>
      <Typography>
        The easiest way to add a recipe from the web is to share it straight to
        the Toast app.
      </Typography>
      <Button onClick={() => setShowHelp(true)}>Show me how</Button>
      <Typography>You can also paste a URL below.</Typography>
      <Dialog open={showHelp} onClose={() => setShowHelp(false)}>
        <Typography variant="h2">Sharing to Toast</Typography>
        <Typography>
          In your device's web browser, visit the page which contains the recipe
          you want to add. Then, tap the <Icon name="share" /> Share button.
        </Typography>
        <Typography>
          When a list of apps comes up, look for Toast and choose it.
        </Typography>
        <Typography>
          If you don't see Toast come up, your device might not support sharing
          directly to this app. Copy the URL instead and paste it into the
          "Recipe URL" field on this page instead.
        </Typography>
      </Dialog>
    </div>
  );
};

export const LinkRecipeMutation = gql`
  mutation LinkRecipe($url: String!) {
    linkRecipe(input: { url: $url }) {
      recipe {
        id
        title
        locked
      }
      problems
    }
  }
`;

export interface LinkRecipeFormProps {
  prefilledValue?: string;
}

const LinkRecipeForm: FC<LinkRecipeFormProps> = ({ prefilledValue }) => {
  const {
    working,
    error,
    lastResult,
    reset,
    handleStarted,
    handleComplete,
    handleFailed,
  } = useLinker();
  const [url, setUrl] = useState(prefilledValue || '');
  const mutate = useMutation(LinkRecipeMutation);
  const isInstalled = useMedia('(display-mode: standalone)');

  const submit = async (ev?: any) => {
    if (ev) {
      ev.preventDefault();
    }
    handleStarted && handleStarted();

    try {
      const result = await mutate({
        variables: {
          url,
        },
      });

      if (!result) {
        throw new Error(MESSAGES.UNKNOWN_ERROR);
      }

      if (result.data.linkRecipe.problems.length) {
        logger.warn(result.data.linkRecipe.problems); // TODO: show
      }

      handleComplete && handleComplete(result.data.linkRecipe);
    } catch (err) {
      logger.fatal(err);
      handleFailed && handleFailed(err);
    }
  };

  React.useEffect(() => {
    if (prefilledValue) {
      submit();
    }
  }, [prefilledValue]);

  if (working) {
    return (
      <>
        <Loader inline size="20vh" />
        <Typography>Scanning your recipe...</Typography>
      </>
    );
  }

  if (lastResult) {
    const linkTo = lastResult.recipe.locked
      ? `/recipes/${lastResult.recipe.id}/correct`
      : `/recipes/${lastResult.recipe.id}/edit`;

    if (lastResult.problems.length) {
      return (
        <Box>
          <Typography color="secondary">
            We didn't quite get everything.
          </Typography>
          <Typography>
            That one was a little tough. We need to hand it over to you to
            finish off.
          </Typography>
          <Box flexDirection="row">
            <Link to={linkTo}>
              <Button>Manage Recipe</Button>
            </Link>
            <Button onClick={reset}>Scan another one</Button>
          </Box>
        </Box>
      );
    }

    return (
      <Box>
        <Typography color="secondary">Nice!</Typography>
        <Typography>
          We scanned <i>{lastResult.recipe.title}</i> for you.{' '}
          <Link to={linkTo}>
            Give it a once-over just to make sure we got things right.
          </Link>
        </Typography>
        <Button onClick={reset}>Scan another one</Button>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography color="error">Bummer.</Typography>
        <Typography>
          This is totally our fault... We couldn't scan that recipe page. We're
          working on some options for situations like this, but for now we're
          sorry for the disappointment.
        </Typography>
        <Button onClick={reset}>Back</Button>
      </Box>
    );
  }

  return (
    <form onSubmit={submit}>
      {isInstalled ? <InstalledMessage /> : <UninstalledMessage />}
      <TextField
        label="Recipe URL"
        value={url}
        onChange={ev => setUrl(ev.target.value)}
        name="recipeUrl"
        type="url"
      />
      <Button type="submit" disabled={!url} color="primary">
        Scan
      </Button>
      {url && (
        <Button variant="text" type="reset" onClick={() => setUrl('')}>
          Clear
        </Button>
      )}
    </form>
  );
};

export default LinkRecipeForm;
