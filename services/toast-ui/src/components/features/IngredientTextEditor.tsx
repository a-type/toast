import React, { FC, useState, useCallback, useMemo } from 'react';
import {
  makeStyles,
  Theme,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
} from '@material-ui/core';
import { Editor } from 'slate-react';
import { Value, Plugin } from 'slate';
import Plain from 'slate-plain-serializer';
import { useFoodSuggestionsPlugin } from 'hooks/slate/useFoodSuggestionsPlugin';

export interface IngredientTextEditorProps {
  value: string;
  onChange: (newValue: string) => any;
}

const useStyles = makeStyles<Theme, IngredientTextEditorProps>(theme => ({
  /* custom styles go here */
  editor: {
    border: `1px solid ${theme.palette.grey[500]}`,
  },
}));

export const IngredientTextEditor: FC<IngredientTextEditorProps> = props => {
  const classes = useStyles(props);
  const { value, onChange } = props;

  const [slateValue, setSlateValue] = useState<Value>(
    Plain.deserialize(value || ''),
  );

  const handleChange = useCallback(
    ({ value: v }) => {
      setSlateValue(v);
      onChange(Plain.serialize(v));
    },
    [setSlateValue],
  );

  const [
    foodSuggestionsPlugin,
    { popperAnchor, loading, suggestions },
  ] = useFoodSuggestionsPlugin();

  const plugins = useMemo(() => [foodSuggestionsPlugin], [
    foodSuggestionsPlugin,
  ]);

  console.info('Rerender');

  return (
    <>
      <Editor value={slateValue} onChange={handleChange} plugins={plugins} />
      {popperAnchor && (
        <Popper
          open={!!popperAnchor}
          transition
          placement="bottom-start"
          anchorEl={popperAnchor}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={350}>
              <Paper>
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <MenuList>
                    {suggestions.map(({ id, name }) => (
                      <MenuItem key={id}>{name}</MenuItem>
                    ))}
                  </MenuList>
                )}
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </>
  );
};
