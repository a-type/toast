import React, { useState } from 'react';
import { RecipeCollections } from 'components/features/RecipeCollections';
import { Container, makeStyles } from '@material-ui/core';
import RecipeCollection from 'components/features/RecipeCollection';
import Popup from 'components/generic/Popup';

const useStyles = makeStyles(theme => ({
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
  const classes = useStyles(props);

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
          <RecipeCollection collectionId={showCollection.id} />
        )}
      </Popup>
    </Container>
  );
};
