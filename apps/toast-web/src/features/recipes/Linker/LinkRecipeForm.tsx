import * as React from 'react';
import { Loader } from 'components/generic';
import logger from 'logger';
import { Disconnected, Field } from 'components/generic';
import { TextInput, Button, Paragraph, Box, Text } from 'grommet';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { Link } from 'components/text';

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
      }
      problems
    }
  }
`;

export interface LinkRecipeFormProps {
  onStarted?(): any;
  onComplete?(args: { id: string; title: string }): any;
  onFailed?(err: Error): any;
  onReset?(): any;
  loading?: boolean;
  error?: Error;
  lastResult?: { id: string; title: string };
}

const LinkRecipeForm: React.SFC<LinkRecipeFormProps> = ({
  onStarted,
  onComplete,
  onFailed,
  onReset,
  loading,
  error,
  lastResult,
}) => {
  const [url, setUrl] = React.useState('');
  const mutate = useMutation(LinkRecipeMutation);

  if (loading) {
    return <Loader />;
  }

  if (lastResult) {
    return (
      <Box>
        <Text color="status-ok">Nice!</Text>
        <Paragraph>
          We scanned <i>{lastResult.title}</i> for you.{' '}
          <Link to={`/recipes/${lastResult.id}/correct`}>
            Give it a once-over just to make sure we got things right.
          </Link>
        </Paragraph>
        <Button label="Scan another one" onClick={onStarted} />
      </Box>
    );
  }

  const submit = async ev => {
    ev.preventDefault();
    onStarted && onStarted();

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

      onComplete &&
        onComplete({
          id: result.data.linkRecipe.recipe.id,
          title: result.data.linkRecipe.recipe.title,
        });
    } catch (err) {
      logger.fatal(err);
      onFailed && onFailed(err);
    }
  };

  if (error) {
    return (
      <Box>
        <Text color="status-error">Bummer.</Text>
        <Paragraph>
          This is totally our fault... We couldn't scan that recipe page. We're
          working on some options for situations like this, but for now we're
          sorry for the disappointment.
        </Paragraph>
        <Button onClick={() => onReset()}>Back</Button>
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
        />
      </Field>
      <Button
        type="submit"
        label="Scan"
        disabled={!url}
        primary
        margin={{ right: 'medium' }}
      />
      <Button label="Cancel" type="reset" onClick={onReset} />
    </form>
  );
};

export default LinkRecipeForm;
