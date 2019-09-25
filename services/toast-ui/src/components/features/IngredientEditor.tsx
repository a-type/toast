import React, {
  FC,
  useState,
  useCallback,
  useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  makeStyles,
  Theme,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  Typography,
  ClickAwayListener,
} from '@material-ui/core';
import { Value, SchemaProperties } from 'slate';
import Plain from 'slate-plain-serializer';
import { useFoodSuggestionsPlugin } from 'hooks/slate/useFoodSuggestionsPlugin';
import { SlateEditor } from 'components/generic/SlateEditor';

export interface IngredientTextEditorProps {
  value: string;
  onChange: (newValue: string) => any;
  className?: string;
}

const useStyles = makeStyles<Theme, IngredientTextEditorProps>(theme => ({
  menuTitle: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    fontStyle: 'italic',
  },
  menuItem: {
    paddingRight: '50px',
  },
  tabIcon: {
    position: 'absolute',
    textTransform: 'uppercase',
    right: theme.spacing(2),
    padding: `0 ${theme.spacing(1)}px`,
    fontSize: 10,
    border: `1px solid currentColor`,
  },
  popper: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

export const IngredientEditor = forwardRef<any, IngredientTextEditorProps>(
  (props, ref) => {
    const classes = useStyles(props);
    const { value, onChange, ...rest } = props;

    const [slateValue, setSlateValue] = useState<Value>(
      Plain.deserialize(value || ''),
    );

    useImperativeHandle(
      ref,
      () => ({
        reset: () => setSlateValue(Plain.deserialize('')),
      }),
      [setSlateValue],
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
        closeSuggestions,
      },
    ] = useFoodSuggestionsPlugin();

    const plugins = useMemo(() => [foodSuggestionsPlugin], [
      foodSuggestionsPlugin,
    ]);

    return (
      <>
        <SlateEditor
          value={slateValue}
          onChange={handleChange}
          plugins={plugins}
          {...rest}
        />
        {showSuggestions && (
          <Popper
            open={!!popperAnchor}
            transition
            placement="bottom-start"
            anchorEl={popperAnchor}
            className={classes.popper}
          >
            {({ TransitionProps }) => (
              <Grow {...TransitionProps} timeout={350}>
                <Paper elevation={3}>
                  <ClickAwayListener onClickAway={closeSuggestions}>
                    <>
                      <Typography
                        variant="caption"
                        className={classes.menuTitle}
                      >
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
                              className={classes.menuItem}
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
                    </>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        )}
      </>
    );
  },
);
