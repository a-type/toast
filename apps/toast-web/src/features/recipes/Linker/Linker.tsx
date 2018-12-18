import * as React from 'react';
import LinkRecipeMutation from './LinkRecipeMutation';
import { cold } from 'react-hot-loader';
import { Loader } from './components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import logger from 'logger';
import { Disconnected, Input, Field, Button } from 'components/generic';
import { P } from 'components/typeset';

const MESSAGES = {
  EXPLANATION:
    'Our computers will do their best to read the recipe on the webpage you provide and add it to your collection. Just enter a valid URL below.',
  UNKNOWN_ERROR:
    "Something went wrong when we tried to scan this recipe. If trying again doesn't work, feel free to reach out.",
};

const RecipeLinker: React.SFC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [url, setUrl] = React.useState('');

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Disconnected />;
  }

  return (
    <LinkRecipeMutation>
      {mutate => {
        const submit = async ev => {
          ev.preventDefault();
          setLoading(true);

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

            history.push(`/recipes/${result.data.linkRecipe.recipe.id}/edit`);
          } catch (err) {
            setLoading(false);
            logger.fatal(err);
            setError(err.message);
          }
        };

        return (
          <form onSubmit={submit}>
            <P>{MESSAGES.EXPLANATION}</P>
            <Field label="Recipe URL">
              <Input
                value={url}
                onChange={ev => setUrl(ev.target.value)}
                name="recipeUrl"
              />
            </Field>
            <Button type="submit">Scan</Button>
          </form>
        );
      }}
    </LinkRecipeMutation>
  );
};

export default cold(withRouter(RecipeLinker));
