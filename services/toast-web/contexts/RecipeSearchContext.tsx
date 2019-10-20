import React, { createContext, useState, useContext, useCallback } from 'react';

export type RecipeSearchIngredientFilterValue = {
  id: string;
  name: string;
};

interface RecipeSearchContextValue {
  searchTerm: string;
  setSearchTerm(term: string): void;
  includeIngredients: RecipeSearchIngredientFilterValue[];
  setIncludeIngredients(newSet: RecipeSearchIngredientFilterValue[]): void;
  excludeIngredients: RecipeSearchIngredientFilterValue[];
  setExcludeIngredients(newSet: RecipeSearchIngredientFilterValue[]): void;
  reset(): void;
}

const RecipeSearchContext = createContext<RecipeSearchContextValue>({
  searchTerm: '',
  setSearchTerm() {},
  includeIngredients: [],
  setIncludeIngredients() {},
  excludeIngredients: [],
  setExcludeIngredients() {},
  reset() {},
});

export default RecipeSearchContext;

export const Provider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [includeIngredients, setIncludeIngredients] = useState<
    RecipeSearchIngredientFilterValue[]
  >([]);
  const [excludeIngredients, setExcludeIngredients] = useState<
    RecipeSearchIngredientFilterValue[]
  >([]);

  const reset = useCallback(() => {
    setSearchTerm('');
    setIncludeIngredients([]);
    setExcludeIngredients([]);
  }, []);

  return (
    <RecipeSearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        includeIngredients,
        setIncludeIngredients,
        excludeIngredients,
        setExcludeIngredients,
        reset,
      }}
    >
      {children}
    </RecipeSearchContext.Provider>
  );
};

export const Consumer = RecipeSearchContext.Consumer;

export const useRecipeSearch = () => {
  const context = useContext(RecipeSearchContext);

  const addIncludeIngredient = useCallback(
    (ingredient: RecipeSearchIngredientFilterValue) => {
      context.setIncludeIngredients([
        ...context.includeIngredients.filter(({ id }) => id !== ingredient.id),
        ingredient,
      ]);
    },
    [context],
  );

  const removeIncludeIngredient = useCallback(
    (ingredientId: string) => {
      context.setIncludeIngredients(
        context.includeIngredients.filter(({ id }) => id !== ingredientId),
      );
    },
    [context],
  );

  const addExcludeIngredient = useCallback(
    (ingredient: RecipeSearchIngredientFilterValue) => {
      context.setExcludeIngredients([
        ...context.excludeIngredients.filter(({ id }) => id !== ingredient.id),
        ingredient,
      ]);
    },
    [context],
  );

  const removeExcludeIngredient = useCallback(
    (ingredientId: string) => {
      context.setExcludeIngredients(
        context.excludeIngredients.filter(({ id }) => id !== ingredientId),
      );
    },
    [context],
  );

  return {
    ...context,
    addIncludeIngredient,
    addExcludeIngredient,
    removeIncludeIngredient,
    removeExcludeIngredient,
  };
};
