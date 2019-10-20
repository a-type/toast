import React, { FC, useState, useCallback, MouseEvent } from 'react';
import {
  makeStyles,
  Theme,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Menu,
  Popover,
  Box,
  TablePagination,
} from '@material-ui/core';
import { useFoods, ManageFoodsFood } from 'hooks/features/useFoods';
import { useUpdateFood } from 'hooks/features/useUpdateFood';
import { TextField } from 'components/fields';
import { pathOr } from 'ramda';

export interface ManageFoodListProps {}

const useStyles = makeStyles<Theme, ManageFoodListProps>(theme => ({
  /* custom styles go here */
}));

export const ManageFoodList: FC<ManageFoodListProps> = props => {
  const classes = useStyles(props);
  const {} = props;

  const { data, loading, fetchMore } = useFoods({});

  const edges = pathOr([], ['foods', 'edges'], data);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? null
            : !data
            ? null
            : edges.map(({ node }) => (
                <ManageFoodRow food={node} key={node.id} />
              ))}
        </TableBody>
      </Table>
      <Button onClick={() => fetchMore()}>Load more</Button>
    </>
  );
};

const ManageFoodRow: FC<{ food: ManageFoodsFood }> = props => {
  const { food } = props;

  const [
    categoryMenuAnchorEl,
    setCategoryMenuAnchorEl,
  ] = useState<null | HTMLElement>(null);
  const handleCategoryClick = useCallback(
    (ev: MouseEvent<HTMLButtonElement>) => {
      setCategoryMenuAnchorEl(ev.currentTarget);
    },
    [],
  );
  const handleCategoryClose = useCallback(
    () => setCategoryMenuAnchorEl(null),
    [],
  );

  return (
    <>
      <TableRow>
        <TableCell>{food.name}</TableCell>
        <TableCell>
          <Button variant="text" onClick={handleCategoryClick}>
            {food.category}
          </Button>
        </TableCell>
        <TableCell>{food.id}</TableCell>
      </TableRow>
      <Popover
        anchorEl={categoryMenuAnchorEl}
        open={!!categoryMenuAnchorEl}
        onClose={handleCategoryClose}
      >
        <FoodCategoryChangeForm food={food} onSaved={handleCategoryClose} />
      </Popover>
    </>
  );
};

const FoodCategoryChangeForm: FC<{
  food: ManageFoodsFood;
  onSaved: () => any;
}> = props => {
  const { food, onSaved } = props;
  const [updateFood] = useUpdateFood();
  const [inputValue, setInputValue] = useState(food.category);
  const handleSave = useCallback(async () => {
    await updateFood({
      variables: {
        input: {
          id: food.id,
          category: inputValue,
        },
      },
    });
    onSaved && onSaved();
  }, [updateFood, food, inputValue]);

  return (
    <Box flexDirection="row" display="flex" p={1}>
      <form
        onSubmit={ev => {
          ev.preventDefault();
          handleSave();
        }}
      >
        <TextField
          value={inputValue}
          onChange={ev => setInputValue(ev.target.value)}
          label="Category"
          style={{ marginRight: '8px' }}
          autoFocus
          onFocus={ev => ev.target.select()}
        />
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </form>
    </Box>
  );
};
