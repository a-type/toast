// @flow
import React, { createContext } from 'react';
import client from 'apolloClient';
import { Recipes } from 'queries/Search';
import { type Ingredient, type Recipe } from 'types';

export type SearchContextState = {
  ingredients: {
    include: Array<Ingredient>,
    exclude: Array<Ingredient>,
  },
  term: string,
  loading: boolean,
  error: ?string,
  results: Array<Recipe>,
};
export type SearchContextActions = {
  includeIngredient(ingredient: Ingredient): any,
  excludeIngredient(ingredient: Ingredient): any,
  removeIncludedIngredient(ingredient: Ingredient): any,
  removeExcludedIngredient(ingredient: Ingredient): any,
  setTerm(term: string): any,
  onTermFocus(): any,
  onTermBlur(): any,
};
export type SearchContext = {
  state: SearchContextState & { active: boolean },
  actions: SearchContextActions,
};

type InternalState = SearchContextState & { isTermFocused: boolean };

const initialState = {
  ingredients: {
    include: [],
    exclude: [],
  },
  term: '',
  loading: false,
  results: [],
  error: null,
  isTermFocused: false,
};

const context = createContext({ state: initialState });
const InternalProvider = context.Provider;

const SEARCH_TIMER = 1000;

export class Provider extends React.PureComponent<*, InternalState> {
  state = initialState;
  searchTimeout: TimeoutID | null = null;

  componentDidUpdate(_oldProps: {}, oldState: InternalState) {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    if (
      (oldState.term !== this.state.term ||
        oldState.ingredients.include.length !==
          this.state.ingredients.include.length ||
        oldState.ingredients.exclude.length !==
          this.state.ingredients.exclude.length) &&
      (this.state.term.length > 0 ||
        this.state.ingredients.exclude.length > 0 ||
        this.state.ingredients.include.length > 0)
    ) {
      this.startSearchTimer();
    }
  }

  componentWillUnmount() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }

  startSearchTimer = () => {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(this.search, SEARCH_TIMER);
  };

  search = async () => {
    try {
      this.setState({ loading: true });
      const { data } = await client.query({
        query: Recipes,
        variables: {
          input: {
            term: this.state.term,
            ingredients: {
              include: this.state.ingredients.include.map(ing => ing.id),
              exclude: this.state.ingredients.exclude.map(ing => ing.id),
            },
          },
        },
      });
      this.setState({ results: data.searchRecipes.items, loading: false });
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  };

  handleIngredientInclude = (ingredient: Ingredient) => {
    this.setState(({ ingredients }) => ({
      ingredients: {
        include: ingredients.include.concat(ingredient),
        exclude: ingredients.exclude,
      },
    }));
  };
  handleIncludeRemoved = (ingredient: Ingredient) => {
    this.setState(({ ingredients }) => {
      if (
        ingredients.exclude.length === 0 &&
        ingredients.include.every(value => value.id === ingredient.id)
      ) {
        return {
          ingredients: {
            include: [],
            exclude: [],
          },
        };
      }
      return {
        ingredients: {
          include: ingredients.include.filter(
            value => value.id !== ingredient.id,
          ),
          exclude: ingredients.exclude,
        },
      };
    });
  };

  handleIngredientExclude = (ingredient: Ingredient) => {
    this.setState(({ ingredients }) => ({
      ingredients: {
        include: ingredients.include,
        exclude: ingredients.exclude.concat(ingredient),
      },
    }));
  };
  handleExcludeRemoved = (ingredient: Ingredient) => {
    this.setState(({ ingredients }) => {
      if (
        ingredients.include.length === 0 &&
        ingredients.exclude.every(value => value.id === ingredient.id)
      ) {
        return {
          ingredients: {
            include: [],
            exclude: [],
          },
        };
      }
      return {
        ingredients: {
          exclude: ingredients.exclude.filter(
            value => value.id !== ingredient.id,
          ),
          include: ingredients.include,
        },
      };
    });
  };

  setTerm = (term: string) => {
    this.setState({ term });
  };
  handleTermFocus = () => this.setState({ isTermFocused: true });
  handleTermBlur = () => this.setState({ isTermFocused: false });

  actions = {
    includeIngredient: this.handleIngredientInclude,
    excludeIngredient: this.handleIngredientExclude,
    removeIncludedIngredient: this.handleIncludeRemoved,
    removeExcludedIngredient: this.handleExcludeRemoved,
    setTerm: this.setTerm,
    onTermFocus: this.handleTermFocus,
    onTermBlur: this.handleTermBlur,
  };

  render() {
    const { isTermFocused, ...internalState } = this.state;
    const active =
      isTermFocused ||
      internalState.term.length > 0 ||
      internalState.ingredients.include.length > 0 ||
      internalState.ingredients.exclude.length > 0;

    return (
      <InternalProvider
        value={{
          state: { ...internalState, active },
          actions: this.actions,
        }}
      >
        {this.props.children}
      </InternalProvider>
    );
  }
}

export const Consumer = context.Consumer;
