import React, { FC, useCallback } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { FullRecipe } from 'hooks/features/fragments';
import { UploadableImage } from 'components/UploadableImage';
import { useUpdateRecipe } from 'hooks/features/useUpdateRecipe';
import { useSnackbar } from 'notistack';

export interface RecipeCoverImageEditorProps {
  recipe: FullRecipe;
}

const useStyles = makeStyles<Theme, RecipeCoverImageEditorProps>(theme => ({
  image: {
    width: '100%',
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    borderRadius: theme.shape.borderRadius,
    '&::after': {
      content: '""',
      paddingBottom: '42%',
    },
  },
}));

export const RecipeCoverImageEditor: FC<
  RecipeCoverImageEditorProps
> = props => {
  const classes = useStyles(props);
  const { recipe } = props;

  const [updateRecipe] = useUpdateRecipe();
  const { enqueueSnackbar } = useSnackbar();

  const handleImageChange = useCallback(
    async (image: File) => {
      try {
        await updateRecipe({
          variables: {
            input: {
              id: recipe.id,
              coverImage: image,
            },
          },
        });
      } catch (err) {
        console.error(err);
        enqueueSnackbar('Image upload failed. Please try again.');
      }
    },
    [updateRecipe, recipe.id],
  );

  return (
    <UploadableImage
      className={classes.image}
      onChange={handleImageChange}
      value={recipe.coverImageUrl}
    />
  );
};
