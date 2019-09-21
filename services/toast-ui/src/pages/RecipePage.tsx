import React, { FC, useState } from 'react';
import Recipe from 'components/features/recipes/recipeView/RecipeView';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import Fullscreen from 'components/layout/Fullscreen';
import RecipeEditor from 'components/features/recipes/RecipeEditor';
import { RecipeCollections } from 'components/features/RecipeCollections';
import {
  Container,
  makeStyles,
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Theme,
  Button,
  Paper,
} from '@material-ui/core';
import RecipeCollection from 'components/features/RecipeCollection';
import Popup from 'components/generic/Popup';
import LinkRecipeForm from 'components/features/recipes/LinkRecipeForm';
import { parse } from 'query-string';
import useRouter from 'use-react-router';
import { Center } from 'components/layout/Center';
import {
  FindInPageTwoTone,
  BookmarksTwoTone,
  AddCircleTwoTone,
} from '@material-ui/icons';
import Link from 'components/generic/Link';
import { AuthoredRecipes } from 'components/features/recipes/AuthoredRecipes';

export const RecipePage = () => (
  <Switch>
    <Route path="/recipes/collections" component={CollectionsPage} />
    <Route path="/recipes/scan" component={ScanPage} />
    <Route
      path={['/recipes/create', '/recipes/:recipeId/edit'] as any}
      component={EditRecipePage}
    />
    <Route path="/recipes/:recipeId" component={RecipeViewPage} />
    <Route path="/recipes" exact component={RecipesHomePage} />
  </Switch>
);

const useHomePageStyles = makeStyles<Theme, {}>(theme => ({
  paper: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
  },
  headingRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  heading: {
    flex: '1',
  },
}));

const RecipesHomePage: FC = () => {
  const classes = useHomePageStyles({});

  return (
    <Container>
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.headingRow}>
          <Typography variant="h2" className={classes.heading}>
            Your Recipes
          </Typography>
          <Button component={Link} to="/recipes/create">
            <AddCircleTwoTone /> Add new
          </Button>
        </div>
        <AuthoredRecipes />
      </Paper>
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.headingRow}>
          <Typography variant="h2" className={classes.heading}>
            Your Collections
          </Typography>
          <Button component={Link} to="/recipes/scan">
            <FindInPageTwoTone /> Scan new
          </Button>
        </div>
        <RecipeCollections />
      </Paper>
    </Container>
  );
};

const RecipeViewPage: FC<RouteComponentProps<{ recipeId: string }>> = ({
  match: { params },
  location,
}) => {
  const { servings } = parse(location.search.replace('?', ''));
  const servingsValue = servings ? parseInt(servings as string, 10) : undefined;

  return (
    <Container>
      <Recipe recipeId={params.recipeId} servings={servingsValue} />
    </Container>
  );
};

const EditRecipePage = ({ match: { params } }) => (
  <Container>
    <RecipeEditor recipeId={params.recipeId || null} />
  </Container>
);

const useCollectionsPageStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4),
  },
  collectionName: {
    flexGrow: 1,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
}));

export const CollectionsPage = props => {
  const [showCollection, setShowCollection] = useState(null);
  const classes = useCollectionsPageStyles(props);

  const handleClose = () => setShowCollection(null);

  return (
    <Container className={classes.container}>
      <RecipeCollections onCollectionSelected={setShowCollection} />

      <Popup
        title={showCollection ? showCollection.name : ''}
        open={!!showCollection}
        onClose={handleClose}
      >
        {showCollection && (
          <DialogContent>
            <RecipeCollection collectionId={showCollection.id} />
          </DialogContent>
        )}
      </Popup>
    </Container>
  );
};

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
