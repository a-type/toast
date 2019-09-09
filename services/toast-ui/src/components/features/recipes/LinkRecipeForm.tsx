import {
  Box,
  Button,
  Dialog,
  makeStyles,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  DialogContent,
} from '@material-ui/core';
import Link from 'components/generic/Link';
import { Row } from 'components/generic/Row';
import { useLinker } from 'contexts/LinkerContext';
import gql from 'graphql-tag';
import useMedia from 'hooks/useMedia';
import logger from 'logger';
import React, { FC, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ClearTwoTone, ShareTwoTone } from '@material-ui/icons';
import Popup from 'components/generic/Popup';
import { ScanGraphic } from 'components/graphics/ScanGraphic';

const MESSAGES = {
  EXPLANATION:
    'Our computers will do their best to read the recipe on the webpage you provide and add it to your collection. Just enter a valid URL below.',
  UNKNOWN_ERROR:
    "Something went wrong when we tried to scan this recipe. If trying again doesn't work, feel free to reach out.",
};

const UninstalledMessage = () => (
  <Typography variant="body1" paragraph>
    {MESSAGES.EXPLANATION}
  </Typography>
);

const InstalledMessage = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div>
      <Typography variant="body1" paragraph>
        The easiest way to add a recipe from the web is to share it straight to
        the Toast app.
      </Typography>
      <Button
        onClick={() => setShowHelp(true)}
        variant="contained"
        color="primary"
        style={{ marginBottom: 8 }}
      >
        Learn how
      </Button>
      <Typography paragraph>You can also paste a URL below.</Typography>
      <Popup
        open={showHelp}
        onClose={() => setShowHelp(false)}
        title="Sharing to Toast"
      >
        <DialogContent>
          <Typography paragraph>
            In your device's web browser, visit the page which contains the
            recipe you want to add. Then, tap the <ShareTwoTone /> Share button.
          </Typography>
          <Typography paragraph>
            When a list of apps comes up, look for Toast and choose it.
          </Typography>
          <Typography paragraph>
            If you don't see Toast come up, your device might not support
            sharing directly to this app. Copy the URL instead and paste it into
            the "Recipe URL" field on this page instead.
          </Typography>
        </DialogContent>
      </Popup>
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

const useStyles = makeStyles(() => ({
  button: {},
}));

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
  const [mutate] = useMutation(LinkRecipeMutation);
  const isInstalled = useMedia('(display-mode: standalone)');
  const classes = useStyles({});

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
      <Box display="flex" flexDirection="column" alignItems="center">
        <ScanGraphic />
        <Typography>Scanning your recipe...</Typography>
      </Box>
    );
  }

  if (lastResult) {
    const linkTo = lastResult.recipe
      ? lastResult.recipe.locked
        ? `/recipes/${lastResult.recipe.id}`
        : `/recipes/${lastResult.recipe.id}/edit`
      : null;

    if (lastResult.problems.length) {
      return (
        <Box>
          <Typography variant="h4" color="secondary" paragraph>
            We didn't quite get everything.
          </Typography>
          <Typography paragraph>
            That one was a little tough. We may have gotten some things wrong.
          </Typography>
          <Row>
            {linkTo && (
              <Link to={linkTo}>
                <Button className={classes.button}>View Recipe</Button>
              </Link>
            )}
            <Button
              variant="contained"
              onClick={reset}
              className={classes.button}
            >
              Scan another one
            </Button>
          </Row>
        </Box>
      );
    }

    return (
      <Box>
        <Typography color="secondary" paragraph>
          Nice!
        </Typography>
        <Typography paragraph>
          We scanned <i>{lastResult.recipe.title}</i> for you.{' '}
          <Link to={linkTo}>
            Give it a once-over just to make sure we got things right.
          </Link>
        </Typography>
        <Button variant="contained" onClick={reset} className={classes.button}>
          Scan another one
        </Button>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography color="error" paragraph>
          Bummer.
        </Typography>
        <Typography paragraph>
          This is totally our fault... We couldn't scan that recipe page. We're
          working on some options for situations like this, but for now we're
          sorry for the disappointment.
        </Typography>
        <Button onClick={reset} className={classes.button}>
          Back
        </Button>
      </Box>
    );
  }

  return (
    <form onSubmit={submit}>
      {isInstalled ? <InstalledMessage /> : <UninstalledMessage />}

      <Row>
        <TextField
          fullWidth
          label="Recipe URL"
          value={url}
          onChange={ev => setUrl(ev.target.value)}
          name="recipeUrl"
          type="url"
          variant="filled"
          color="secondary"
          InputProps={{
            endAdornment: !!url ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear recipe URL field"
                  onClick={() => setUrl('')}
                >
                  <ClearTwoTone />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
        <Button
          className={classes.button}
          type="submit"
          disabled={!url}
          color="primary"
          variant="contained"
        >
          Scan
        </Button>
      </Row>
    </form>
  );
};

export default LinkRecipeForm;
