import React, { useState, FC } from 'react';
import { Loader } from 'components/generic';
import logger from 'logger';
import { Field } from 'components/generic';
import { TextInput, Button, Paragraph, Box, Text } from 'grommet';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { Link } from 'components/generic';
import { useLinker } from 'contexts/LinkerContext';

const MESSAGES = {
  EXPLANATION:
    'Our computers will do their best to read the recipe on the webpage you provide and add it to your collection. Just enter a valid URL below.',
  UNKNOWN_ERROR:
    "Something went wrong when we tried to scan this recipe. If trying again doesn't work, feel free to reach out.",
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
    return <Loader />;
  }

  if (lastResult) {
    const linkTo = lastResult.recipe.locked
      ? `/recipes/${lastResult.recipe.id}/correct`
      : `/recipes/${lastResult.recipe.id}/edit`;

    if (lastResult.problems.length) {
      return (
        <Box>
          <Text color="status-ok">We didn't quite get everything.</Text>
          <Paragraph>
            That one was a little tough. We need to hand it over to you to
            finish off.
          </Paragraph>
          <Box direction="row">
            <Link to={linkTo}>
              <Button label="Manage Recipe" />
            </Link>
            <Button
              margin={{ left: 'large' }}
              label="Scan another one"
              onClick={reset}
            />
          </Box>
        </Box>
      );
    }

    return (
      <Box>
        <Text color="status-ok">Nice!</Text>
        <Paragraph>
          We scanned <i>{lastResult.recipe.title}</i> for you.{' '}
          <Link to={linkTo}>
            Give it a once-over just to make sure we got things right.
          </Link>
        </Paragraph>
        <Button label="Scan another one" onClick={reset} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Text color="status-error">Bummer.</Text>
        <Paragraph>
          This is totally our fault... We couldn't scan that recipe page. We're
          working on some options for situations like this, but for now we're
          sorry for the disappointment.
        </Paragraph>
        <Button onClick={reset}>Back</Button>
      </Box>
    );
  }

  return (
    <form onSubmit={submit}>
      <Paragraph>{MESSAGES.EXPLANATION}</Paragraph>
      <Field label="Recipe URL" required>
        <TextInput
          value={url}
          onChange={ev => setUrl(ev.target.value)}
          name="recipeUrl"
          type="url"
        />
      </Field>
      <Button
        type="submit"
        label="Scan"
        disabled={!url}
        primary
        margin={{ right: 'medium' }}
      />
      {url && <Button label="Clear" type="reset" onClick={() => setUrl('')} />}
    </form>
  );
};

export default LinkRecipeForm;
