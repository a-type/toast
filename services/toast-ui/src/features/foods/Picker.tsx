import React, { FC, useRef, useState, HTMLAttributes } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Downshift from 'downshift';
import {
  Popper,
  Fade,
  Paper,
  ClickAwayListener,
  MenuList,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useDebounce } from 'use-debounce';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { pathOr } from 'ramda';
import ErrorMessage from 'components/generic/ErrorMessage';
import { InputProps } from '@material-ui/core/Input';

const SearchFoodsQuery = gql`
  query SearchFoods($input: FoodSearchInput!) {
    searchFoods(input: $input) {
      id
      name
    }
  }
`;

export type FoodPickerFood = {
  id: string;
  name: string;
};

export type FoodPickerProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  value: FoodPickerFood;
  onChange: (value: FoodPickerFood) => any;
  InputProps?: InputProps;
};

const useStyles = makeStyles(theme => ({
  popper: {
    zIndex: theme.zIndex.modal + 1,
  },
  noResults: {
    fontSize: '0.9rem',
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
  },
}));

export const FoodPicker: FC<FoodPickerProps> = ({
  value,
  onChange,
  InputProps,
  ...rest
}) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(value ? value.name : '');
  const [searchTerm] = useDebounce(inputValue, 500);
  const { data, loading, error } = useQuery(SearchFoodsQuery, {
    variables: {
      input: {
        // this shouldn't be necessary, but backend support is not there yet
        term: searchTerm.replace(/\W/g, ' '),
      },
    },
    skip: !searchTerm || searchTerm.length < 3,
  });
  const searchResults = pathOr(null, ['searchFoods'], data);
  const classes = useStyles(rest);

  return (
    <Downshift
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      itemToString={item => (item ? item.name : '')}
      onChange={onChange}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        inputValue,
        selectedItem,
        highlightedIndex,
        toggleMenu,
        isOpen,
      }) => (
        <div {...rest}>
          <TextField
            value={inputValue}
            fullWidth
            placeholder="Search for foods..."
            InputLabelProps={getLabelProps()}
            InputProps={{
              ...InputProps,
              ...getInputProps({
                onClick: () => toggleMenu(),
                ref: el => {
                  inputRef.current = el;
                },
              }),
            }}
          />
          <Popper
            open={isOpen && !loading && searchResults}
            anchorEl={inputRef.current}
            transition
            className={classes.popper}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  style={{
                    marginTop: 8,
                    width: inputRef.current
                      ? inputRef.current.clientWidth
                      : undefined,
                  }}
                >
                  <ClickAwayListener onClickAway={() => toggleMenu()}>
                    <MenuList>
                      {searchResults ? (
                        searchResults.map(
                          (result, idx) =>
                            (!selectedItem ||
                              result.id !== selectedItem.id) && (
                              <MenuItem
                                key={result.id}
                                selected={highlightedIndex === idx}
                                {...getItemProps({ item: result })}
                              >
                                {result.name}
                              </MenuItem>
                            ),
                        )
                      ) : (
                        <Typography className={classes.noResults}>
                          No results
                        </Typography>
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Fade>
            )}
          </Popper>
          {error && <ErrorMessage error={error} />}
        </div>
      )}
    </Downshift>
  );
};
