import React, { FC, useState, useCallback, useRef } from 'react';
import {
  makeStyles,
  Theme,
  FormHelperText,
  FormControl,
  Box,
  IconButton,
  Grid,
  Button,
} from '@material-ui/core';
import { FullRecipe } from 'hooks/features/useFullRecipe';
import { SlateEditor } from 'components/generic/SlateEditor';
import { Value } from 'slate';
import { useUpdateRecipe } from 'hooks/features/useUpdateRecipe';
import { Editor } from 'slate-react';
import {
  FormatBoldTwoTone,
  FormatItalicTwoTone,
  FormatUnderlinedTwoTone,
} from '@material-ui/icons';

export interface RecipeIntroductionEditorProps {
  recipe: FullRecipe;
}

const useStyles = makeStyles<Theme, RecipeIntroductionEditorProps>(theme => ({
  editor: {
    minHeight: '400px',
  },
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const emptySlateValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: '',
          },
        ],
      },
    ],
  },
});

export const RecipeIntroductionEditor: FC<
  RecipeIntroductionEditorProps
> = props => {
  const classes = useStyles(props);
  const { recipe } = props;

  const [updateRecipe] = useUpdateRecipe();

  const [slateValue, setSlateValue] = useState<Value>(() =>
    recipe.introduction
      ? Value.fromJSON(JSON.parse(recipe.introduction))
      : null,
  );

  const handleSlateChange = useCallback(
    ({ value }) => {
      setSlateValue(value);
    },
    [setSlateValue],
  );

  const save = async () => {
    try {
      await updateRecipe({
        variables: {
          input: {
            id: recipe.id,
            fields: {
              introduction: JSON.stringify(slateValue.toJSON()),
            },
          },
        },
      });
    } finally {
    }
  };

  const editorRef = useRef<Editor>(null);

  const toggleMark = (markName: string) => () => {
    editorRef.current.toggleMark(markName);
  };

  return (
    <Box className={classes.root}>
      <FormControl fullWidth>
        <Grid container spacing={1}>
          <Grid item>
            <IconButton onClick={toggleMark('bold')}>
              <FormatBoldTwoTone />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={toggleMark('italic')}>
              <FormatItalicTwoTone />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={toggleMark('underlined')}>
              <FormatUnderlinedTwoTone />
            </IconButton>
          </Grid>
        </Grid>
        <SlateEditor
          value={slateValue || emptySlateValue}
          onChange={handleSlateChange}
          placeholder="Write something..."
          className={classes.editor}
          ref={editorRef}
        />
        <FormHelperText>
          Write about the history of the recipe, secrets for preparing it, or
          what it's like to cook it for people you love. Anything goes!
        </FormHelperText>
      </FormControl>
      <Button variant="contained" onClick={save}>
        Save
      </Button>
    </Box>
  );
};
