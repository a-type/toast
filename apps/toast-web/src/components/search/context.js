// @flow
import React, { createContext } from 'react';
import client from 'apolloClient';
import { type Ingredient, type Recipe } from 'types';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';

export const Recipes = gql`
  query SearchRecipes($input: RecipeSearchInput!) {
    searchRecipes(input: $input) {
      total
      items {
        id
        title
        coverImage {
          id
          url
        }
      }
    }
  }
`;

export const Ingredients = gql`
  query SearchIngredients($input: IngredientSearchInput!) {
    searchIngredients(input: $input) {
      total
      items {
        id
        name
      }
    }
  }
`;

export type IngredientSuggestion = {
  ingredient: Ingredient,
  onInclude(): mixed,
  onExclude(): mixed,
};
export type SearchSuggestions = {
  ingredients: IngredientSuggestion[],
};
export type IngredientFilter = {
  ingredient: Ingredient,
  type: 'include' | 'exclude',
  onRemove(): mixed,
};
export type SearchFilters = {
  ingredients: Array<IngredientFilter>,
};
export type SearchContextState = {
  filters: SearchFilters,
  inputValue: string,
  term: string,
  loading: boolean,
  error: ?string,
  suggestions: SearchSuggestions,
  results: Recipe[],
};
export type SearchContextActions = {
  onInputChange(value: string): any,
  setTerm(term: string): any,
  onInputFocus(): any,
  onInputBlur(): any,
  reset(): any,
};
export type SearchContext = {
  state: SearchContextState & { active: boolean },
  actions: SearchContextActions,
};

type InternalState = SearchContextState & { isInputFocused: boolean };

type Props = { match: mixed, location: mixed, history: mixed };

const initialState: SearchContextState = {
  filters: {
    ingredients: [],
  },
  term: '',
  inputValue: '',
  loading: false,
  results: [],
  suggestions: {
    ingredients: [],
  },
  error: null,
  isInputFocused: false,
};

const context = createContext({ state: initialState });
const InternalProvider = context.Provider;

const SEARCH_TIMER = 1000;

class SearchProvider extends React.PureComponent<Props, InternalState> {
  state = initialState;
  suggestionTimeout: TimeoutID | null = null;

  componentDidUpdate(_oldProps: {}, oldState: InternalState) {
    if (this.suggestionTimeout) {
      clearTimeout(this.suggestionTimeout);
    }

    if (
      oldState.inputValue !== this.state.inputValue &&
      this.state.inputValue.length > 2
    ) {
      this.startSuggestionsTimer();
    }
  }

  componentWillUnmount() {
    if (this.suggestionTimeout) {
      clearTimeout(this.suggestionTimeout);
    }
  }

  startSuggestionsTimer = () => {
    if (this.suggestionTimeout) {
      clearTimeout(this.suggestionTimeout);
    }
    this.suggestionTimeout = setTimeout(this.fetchSuggestions, SEARCH_TIMER);
  };

  fetchSuggestions = async () => {
    try {
      this.setState({ loading: true });
      const { data } = await client.query({
        query: Ingredients,
        variables: {
          input: {
            term: this.state.inputValue,
          },
        },
      });
      const ingredientSuggestions = data.searchIngredients.items.map(
        ingredient => ({
          ingredient,
          onInclude: () => this.addIngredientFilter(ingredient, 'include'),
          onExclude: () => this.addIngredientFilter(ingredient, 'exclude'),
        }),
      );
      this.setState(({ suggestions }) => ({
        suggestions: { ...suggestions, ingredients: ingredientSuggestions },
        loading: false,
      }));
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  };

  withoutIngredient = (
    ingredientFilters: IngredientFilter[],
    ingredient: Ingredient,
  ): IngredientFilter[] =>
    ingredientFilters.filter(filter => filter.ingredient.id !== ingredient.id);

  addIngredientFilter = (
    ingredient: Ingredient,
    type: 'include' | 'exclude',
  ) => {
    const ingredientFilter: IngredientFilter = {
      ingredient,
      type,
      onRemove: () => this.removeIngredientFilter(ingredient),
    };
    this.setState(
      ({ filters }) => ({
        filters: {
          ...filters,
          ingredients: this.withoutIngredient(
            filters.ingredients,
            ingredient,
          ).concat(ingredientFilter),
        },
        inputValue: '',
      }),
      this.doSearch,
    );
  };

  removeIngredientFilter = (ingredient: Ingredient) =>
    this.setState(
      ({ filters }) => ({
        filters: {
          ...filters,
          ingredients: this.withoutIngredient(filters.ingredients, ingredient),
        },
      }),
      this.doSearch,
    );

  setTerm = (term: string) => {
    this.setState({ term }, this.doSearch);
  };

  handleInputChange = (ev: InputEvent) =>
    this.setState({ inputValue: ev.target.value });
  handleInputFocus = () => this.setState({ isInputFocused: true });
  handleInputBlur = () => this.setState({ isInputFocused: false });

  sortIngredientFilters = (ingredientFilters: IngredientFilter[]) =>
    ingredientFilters.reduce(
      (filters, filter) => {
        filters[filter.type].push(filter.ingredient.id);
        return filters;
      },
      { include: [], exclude: [] },
    );

  doSearch = async () => {
    const { term, filters } = this.state;

    if (term.length === 0 && filters.ingredients.length === 0) {
      this.setState({ results: [] });
      return;
    }

    const { location, history } = this.props;
    const ingredients = this.sortIngredientFilters(filters.ingredients);
    console.info(ingredients);
    const input = {
      term,
      ingredients,
    };

    try {
      const { data } = await client.query({
        query: Recipes,
        variables: {
          input,
        },
      });
      const results = data.searchRecipes.items;
      this.setState({
        results,
      });

      if (location.pathname !== '/search') {
        history.push('/search');
      }
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  };

  reset = () => {
    this.setState(initialState);
  };

  actions = {
    setTerm: this.setTerm,
    onInputChange: this.handleInputChange,
    onInputFocus: this.handleInputFocus,
    onInputBlur: this.handleInputBlur,
    search: this.doSearch,
    reset: this.reset,
  };

  render() {
    const { isInputFocused, ...internalState } = this.state;
    const active =
      isInputFocused ||
      internalState.term.length > 0 ||
      internalState.filters.ingredients.length > 0;

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

export const Provider = withRouter(SearchProvider);

export const Consumer = context.Consumer;
