import React, { FC, useState, useCallback, useMemo } from 'react';
import {
  makeStyles,
  Theme,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { Editor } from 'slate-react';
import { Value, Plugin } from 'slate';
import Plain from 'slate-plain-serializer';
import { useFoodSuggestionsPlugin } from 'hooks/slate/useFoodSuggestionsPlugin';
import { TabTwoTone } from '@material-ui/icons';

export interface IngredientTextEditorProps {
  value: string;
  onChange: (newValue: string) => any;
}

const useStyles = makeStyles<Theme, IngredientTextEditorProps>(theme => ({
  /* custom styles go here */
  editor: {
    border: `1px solid ${theme.palette.grey[500]}`,
  },
  menuTitle: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    fontStyle: 'italic',
  },
  tabIcon: {
    position: 'absolute',
    textTransform: 'uppercase',
    right: theme.spacing(2),
    padding: `0 ${theme.spacing(1)}px`,
    fontSize: 10,
    border: `1px solid currentColor`,
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
    {
      popperAnchor,
      loading,
      suggestions,
      highlightedSuggestion,
      showSuggestions,
    },
  ] = useFoodSuggestionsPlugin();

  const plugins = useMemo(() => [foodSuggestionsPlugin], [
    foodSuggestionsPlugin,
  ]);

  console.info('Rerender');

  return (
    <>
      <Editor value={slateValue} onChange={handleChange} plugins={plugins} />
      {showSuggestions && (
        <Popper
          open={!!popperAnchor}
          transition
          placement="bottom-start"
          anchorEl={popperAnchor}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={350}>
              <Paper>
                <Typography variant="caption" className={classes.menuTitle}>
                  Food suggestions
                </Typography>
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <MenuList>
                    {suggestions.map(({ id, name }, idx) => (
                      <MenuItem
                        key={id}
                        selected={highlightedSuggestion === idx}
                      >
                        {name}
                        {highlightedSuggestion === idx && (
                          <div aria-hidden className={classes.tabIcon}>
                            Tab
                          </div>
                        )}
                      </MenuItem>
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
