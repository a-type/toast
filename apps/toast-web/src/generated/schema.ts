/* tslint:disable */
/** Generated in 2018-11-10T16:36:03-05:00 */

// ====================================================
// START: Typescript template
// ====================================================

// ====================================================
// Scalars
// ====================================================

export type Date = any;

export type Upload = any;

// ====================================================
// Interfaces
// ====================================================

export interface PlanAction {
  id: string;

  type: PlanActionType;

  dayIndex?: number | null;

  mealIndex?: number | null;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  hello: string;

  ingredients: Ingredient[];

  ingredient?: Ingredient | null;

  recipes: Recipe[];

  recipe?: Recipe | null;

  searchRecipes: RecipeSearchResponse;

  searchIngredients: IngredientSearchResponse;

  me?: User | null;

  user?: User | null;

  planWeekIndex: number;

  planStartWeekDate: Date;

  plan?: Plan | null;

  week?: Plan | null;

  messages: Message[];

  promotions: string[];

  preferredServings?: number | null;

  searchFilters: SearchFilter[];

  searchInputValue: string;
}

export interface Ingredient {
  id: string;

  name: string;

  description?: string | null;

  attribution?: string | null;

  alternateNames: string[];

  recipes: Recipe[];
}

export interface Recipe {
  id: string;

  title: string;

  description?: string | null;

  attribution?: string | null;

  sourceUrl?: string | null;

  published: boolean;

  displayType?: RecipeDisplayType | null;

  servings: number;

  cookTime?: number | null;

  prepTime?: number | null;

  unattendedTime?: number | null;

  createdAt: string;

  updatedAt: string;

  viewedAt: string;

  views: number;

  coverImage?: Image | null;

  ingredients: RecipeIngredient[];

  steps: RecipeStep[];

  yourLike?: LikeInfo | null;

  likes?: number | null;

  author?: User | null;

  discoverer?: User | null;
}

export interface Image {
  id: string;

  url: string;

  attribution?: string | null;
}

export interface RecipeIngredient {
  id: string;

  text: string;

  ingredientTextMatch?: string | null;

  recipe: Recipe;

  unit?: string | null;

  unitTextMatch?: string | null;

  value: number;

  valueTextMatch?: string | null;

  index: number;

  ingredient: Ingredient;
}

export interface RecipeStep {
  id: string;

  index: number;

  step: Step;
}

export interface Step {
  id: string;

  text: string;
}

export interface LikeInfo {
  id: string;

  likedAt?: string | null;
}

export interface User {
  id: string;

  name?: string | null;

  nickname?: string | null;

  email?: string | null;

  recipes: Recipe[];

  discoveredRecipes: Recipe[];

  draftRecipes: Recipe[];

  likedRecipes: Recipe[];

  group?: Group | null;
}

export interface Group {
  id: string;

  members: User[];

  plan?: Plan | null;
}

export interface Plan {
  id: string;

  defaultServings: number;

  days: PlanDay[];

  groceryDay: number;

  warnings: string[];

  week?: Plan | null;

  startDate?: Date | null;

  shoppingList: ShoppingList;
}

export interface PlanDay {
  id: string;

  date?: Date | null;

  meals: PlanMeal[];
}

export interface PlanMeal {
  id: string;

  availability: PrepAvailability;

  actions: PlanAction[];
}

export interface ShoppingList {
  id: string;

  weekIndex: number;

  ingredients: ShoppingListIngredient[];
}

export interface ShoppingListIngredient {
  ingredient: Ingredient;

  totalValue: number;

  purchasedValue: number;

  unit?: string | null;

  recipes: Recipe[];
}

export interface RecipeSearchResponse {
  items: (Recipe | null)[];
}

export interface IngredientSearchResponse {
  items: (Ingredient | null)[];
}

export interface Message {
  id: string;

  contents: (string | null)[];
}

export interface SearchFilter {
  id: string;

  type: string;

  subject?: string | null;

  display?: string | null;
}

export interface Mutation {
  ping: string;

  updateRecipeCoverImage: Recipe;

  createIngredient: Ingredient;

  updateIngredient: Ingredient;

  deleteIngredient?: Ingredient | null;

  mergeIngredients?: Ingredient | null;

  createRecipe: Recipe;

  linkRecipe: Recipe;

  updateRecipeDetails?: Recipe | null;

  publishRecipe?: Recipe | null;

  recordRecipeView?: Recipe | null;

  updateRecipeIngredient: RecipeIngredient;

  reparseRecipeIngredient: RecipeIngredient;

  addRecipeIngredient: Recipe;

  moveRecipeIngredient: Recipe;

  deleteRecipeIngredient: Recipe;

  updateRecipeStep: RecipeStep;

  createRecipeStep: Recipe;

  moveRecipeStep: Recipe;

  deleteRecipeStep: Recipe;

  likeRecipe: Recipe;

  unlikeRecipe: Recipe;

  mergeUser?: User | null;

  setPlanDetails: Plan;

  setPlanMealDetails: Plan;

  setPlanStrategy: Plan;

  setPlanActionRecipe: PlanAction;

  markPurchased: ShoppingList;

  showMessage?: Message | null;

  dismissMessage?: number | null;

  dismissPromotion: string;

  setPreferredServings: number;

  setSearchInputValue: string;

  addSearchFilter: SearchFilter;

  removeSearchFilter?: SearchFilter | null;

  resetSearch?: number | null;
}

export interface PlanActionCook extends PlanAction {
  id: string;

  type: PlanActionType;

  dayIndex?: number | null;

  mealIndex?: number | null;

  servings: number;

  mealType: PlanMealType;

  recipe?: Recipe | null;
}

export interface PlanActionEat extends PlanAction {
  id: string;

  type: PlanActionType;

  dayIndex?: number | null;

  mealIndex?: number | null;

  leftovers: boolean;

  cookAction?: PlanActionCook | null;
}

export interface PlanActionEatOut extends PlanAction {
  id: string;

  type: PlanActionType;

  dayIndex?: number | null;

  mealIndex?: number | null;

  note?: string | null;
}

export interface PlanActionReadyMade extends PlanAction {
  id: string;

  type: PlanActionType;

  dayIndex?: number | null;

  mealIndex?: number | null;

  note?: string | null;
}

export interface PlanActionSkip extends PlanAction {
  id: string;

  type: PlanActionType;

  dayIndex?: number | null;

  mealIndex?: number | null;
}

// ====================================================
// InputTypes
// ====================================================

export interface ListPaginationInput {
  offset?: number | null;

  count?: number | null;
}

export interface IngredientListSortInput {
  by: string;

  order?: SortOrder | null;
}

export interface RecipeSearchInput {
  term?: string | null;

  ingredients?: IngredientFilterInput | null;
}

export interface IngredientFilterInput {
  include?: string[] | null;

  exclude?: string[] | null;
}

export interface IngredientSearchInput {
  term?: string | null;
}

export interface ImageCreateInput {
  file?: Upload | null;

  url?: string | null;

  attribution?: string | null;
}

export interface IngredientCreateInput {
  name: string;

  description?: string | null;

  attribution?: string | null;
}

export interface IngredientUpdateInput {
  name?: string | null;

  description?: string | null;

  attribution?: string | null;

  alternateNames?: string[] | null;
}

export interface RecipeCreateInput {
  title: string;

  description?: string | null;

  attribution?: string | null;

  sourceUrl?: string | null;

  servings?: number | null;

  cookTime?: number | null;

  prepTime?: number | null;

  unattendedTime?: number | null;

  displayType?: RecipeDisplayType | null;
}

export interface RecipeLinkInput {
  title: string;

  description?: string | null;

  attribution: string;

  sourceUrl: string;

  ingredientStrings: string[];

  cookTime?: number | null;

  prepTime?: number | null;

  unattendedTime?: number | null;

  servings?: number | null;
}

export interface RecipeDetailsUpdateInput {
  title?: string | null;

  description?: string | null;

  attribution?: string | null;

  sourceUrl?: string | null;

  displayType?: RecipeDisplayType | null;

  servings?: number | null;

  cookTime?: number | null;

  prepTime?: number | null;

  unattendedTime?: number | null;
}

export interface RecipeIngredientUpdateInput {
  unit?: string | null;

  unitTextMatch?: string | null;

  value?: number | null;

  valueTextMatch?: string | null;

  ingredientId?: string | null;

  ingredientTextMatch?: string | null;
}

export interface RecipeIngredientParseInput {
  text: string;
}

export interface ListMoveInput {
  fromIndex: number;

  toIndex: number;
}

export interface RecipeStepUpdateInput {
  text?: string | null;
}

export interface RecipeStepCreateInput {
  text: string;
}

export interface PlanSetDetailsInput {
  defaultServings?: number | null;

  groceryDay?: number | null;
}

export interface PlanSetMealDetailsInput {
  availability?: PrepAvailability | null;
}

// ====================================================
// Arguments
// ====================================================

export interface IngredientsQueryArgs {
  pagination?: ListPaginationInput | null;

  sort?: IngredientListSortInput | null;
}
export interface IngredientQueryArgs {
  id: string;
}
export interface RecipesQueryArgs {
  pagination?: ListPaginationInput | null;
}
export interface RecipeQueryArgs {
  id: string;
}
export interface SearchRecipesQueryArgs {
  input: RecipeSearchInput;
}
export interface SearchIngredientsQueryArgs {
  input: IngredientSearchInput;
}
export interface UserQueryArgs {
  id: string;
}
export interface PlanWeekIndexQueryArgs {
  year: number;

  month: number;

  date: number;
}
export interface WeekQueryArgs {
  weekIndex: number;
}
export interface RecipesIngredientArgs {
  pagination?: ListPaginationInput | null;
}
export interface RecipesUserArgs {
  pagination?: ListPaginationInput | null;
}
export interface DiscoveredRecipesUserArgs {
  pagination?: ListPaginationInput | null;
}
export interface DraftRecipesUserArgs {
  pagination?: ListPaginationInput | null;
}
export interface LikedRecipesUserArgs {
  pagination?: ListPaginationInput | null;
}
export interface WeekPlanArgs {
  weekIndex: number;
}
export interface UpdateRecipeCoverImageMutationArgs {
  id: string;

  input: ImageCreateInput;
}
export interface CreateIngredientMutationArgs {
  input: IngredientCreateInput;
}
export interface UpdateIngredientMutationArgs {
  id: string;

  input: IngredientUpdateInput;
}
export interface DeleteIngredientMutationArgs {
  id: string;
}
export interface MergeIngredientsMutationArgs {
  primary: string;

  secondary: string;
}
export interface CreateRecipeMutationArgs {
  input: RecipeCreateInput;
}
export interface LinkRecipeMutationArgs {
  input: RecipeLinkInput;
}
export interface UpdateRecipeDetailsMutationArgs {
  id: string;

  input: RecipeDetailsUpdateInput;
}
export interface PublishRecipeMutationArgs {
  id: string;
}
export interface RecordRecipeViewMutationArgs {
  id: string;
}
export interface UpdateRecipeIngredientMutationArgs {
  id: string;

  input: RecipeIngredientUpdateInput;
}
export interface ReparseRecipeIngredientMutationArgs {
  id: string;

  input: RecipeIngredientParseInput;
}
export interface AddRecipeIngredientMutationArgs {
  recipeId: string;

  input: RecipeIngredientParseInput;
}
export interface MoveRecipeIngredientMutationArgs {
  recipeId: string;

  input: ListMoveInput;
}
export interface DeleteRecipeIngredientMutationArgs {
  id: string;
}
export interface UpdateRecipeStepMutationArgs {
  id: string;

  input: RecipeStepUpdateInput;
}
export interface CreateRecipeStepMutationArgs {
  recipeId: string;

  input: RecipeStepCreateInput;
}
export interface MoveRecipeStepMutationArgs {
  recipeId: string;

  input: ListMoveInput;
}
export interface DeleteRecipeStepMutationArgs {
  id: string;
}
export interface LikeRecipeMutationArgs {
  id: string;
}
export interface UnlikeRecipeMutationArgs {
  id: string;
}
export interface SetPlanDetailsMutationArgs {
  details: PlanSetDetailsInput;
}
export interface SetPlanMealDetailsMutationArgs {
  dayIndex: number;

  mealIndex: number;

  details: PlanSetMealDetailsInput;
}
export interface SetPlanStrategyMutationArgs {
  strategy?: PlanStrategy | null;
}
export interface SetPlanActionRecipeMutationArgs {
  weekIndex: number;

  dayIndex: number;

  mealIndex: number;

  actionId: string;

  recipeId: string;
}
export interface MarkPurchasedMutationArgs {
  ingredientId: string;

  value: number;

  unit?: string | null;
}
export interface ShowMessageMutationArgs {
  contents: (string | null)[];
}
export interface DismissMessageMutationArgs {
  id: string;
}
export interface DismissPromotionMutationArgs {
  id: string;
}
export interface SetPreferredServingsMutationArgs {
  servings: number;
}
export interface SetSearchInputValueMutationArgs {
  value: string;
}
export interface AddSearchFilterMutationArgs {
  type: string;

  subject?: string | null;

  display?: string | null;
}
export interface RemoveSearchFilterMutationArgs {
  id: string;
}

// ====================================================
// Enums
// ====================================================

export enum SortOrder {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
}

export enum RecipeDisplayType {
  LINK = 'LINK',
  FULL = 'FULL',
}

export enum PrepAvailability {
  SKIP = 'SKIP',
  EAT_OUT = 'EAT_OUT',
  NONE = 'NONE',
  SHORT = 'SHORT',
  MEDIUM = 'MEDIUM',
  LONG = 'LONG',
}

export enum PlanActionType {
  EAT_OUT = 'EAT_OUT',
  COOK = 'COOK',
  EAT = 'EAT',
  READY_MADE = 'READY_MADE',
  SKIP = 'SKIP',
}

export enum PlanStrategy {
  BASIC = 'BASIC',
  PREP = 'PREP',
  BIG_PREP = 'BIG_PREP',
}

export enum CacheControlScope {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum PlanMealType {
  QUICK = 'QUICK',
  BIG = 'BIG',
  FANCY = 'FANCY',
  NORMAL = 'NORMAL',
}

// ====================================================
// END: Typescript template
// ====================================================

// ====================================================
// Documents
// ====================================================

export namespace IngredientDetails {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: 'Query';

    ingredient?: Ingredient | null;
  };

  export type Ingredient = {
    __typename?: 'Ingredient';

    id: string;

    name: string;

    description?: string | null;

    attribution?: string | null;

    alternateNames: string[];

    recipes: Recipes[];
  };

  export type Recipes = RecipeCard.Fragment;
}

export namespace CalendarMealSetRecipe {
  export type Variables = {
    weekIndex: number;
    dayIndex: number;
    mealIndex: number;
    actionId: string;
    recipeId: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    setPlanActionRecipe: SetPlanActionRecipe;
  };

  export type SetPlanActionRecipe = {
    __typename?: 'PlanAction';

    id: string;
  } & CalendarPlanAction.Fragment;
}

export namespace CalendarPlan {
  export type Variables = {
    weekIndex: number;
  };

  export type Query = {
    __typename?: 'Query';

    week?: Week | null;
  };

  export type Week = {
    __typename?: 'Plan';

    startDate?: Date | null;

    id: string;

    days: Days[];
  };

  export type Days = CalendarDay.Fragment;
}

export namespace GetWeekIndex {
  export type Variables = {
    year: number;
    month: number;
    date: number;
  };

  export type Query = {
    __typename?: 'Query';

    planWeekIndex: number;

    planStartWeekDate: Date;
  };
}

export namespace RecipeSuggestions {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    me?: Me | null;
  };

  export type Me = {
    __typename?: 'User';

    id: string;

    recipes: Recipes[];

    discoveredRecipes: DiscoveredRecipes[];

    likedRecipes: LikedRecipes[];
  };

  export type Recipes = RecipeCard.Fragment;

  export type DiscoveredRecipes = RecipeCard.Fragment;

  export type LikedRecipes = RecipeCard.Fragment;
}

export namespace FeaturedRecipes {
  export type Variables = {
    count: number;
  };

  export type Query = {
    __typename?: 'Query';

    recipes: Recipes[];
  };

  export type Recipes =
    | {
        __typename?: 'Recipe';

        coverImage?: CoverImage | null;
      } & RecipeCard.Fragment
    | RecipeSpotlight.Fragment;

  export type CoverImage = {
    __typename?: 'Image';

    id: string;

    url: string;

    attribution?: string | null;
  };
}

export namespace LikeRecipe {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    likeRecipe: LikeRecipe;
  };

  export type LikeRecipe = LikeButton.Fragment;
}

export namespace UnlikeRecipe {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    unlikeRecipe: UnlikeRecipe;
  };

  export type UnlikeRecipe = LikeButton.Fragment;
}

export namespace RecipeSearchFilters {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    searchFilters: SearchFilters[];
  };

  export type SearchFilters = {
    __typename?: 'SearchFilter';

    id: string;

    type: string;

    subject?: string | null;
  };
}

export namespace SearchRecipes {
  export type Variables = {
    input: RecipeSearchInput;
  };

  export type Query = {
    __typename?: 'Query';

    searchRecipes: SearchRecipes;
  };

  export type SearchRecipes = {
    __typename?: 'RecipeSearchResponse';

    items: (Items | null)[];
  };

  export type Items = {
    __typename?: 'Recipe';

    id: string;
  } & RecipeCard.Fragment;
}

export namespace GetShoppingList {
  export type Variables = {
    weekIndex: number;
  };

  export type Query = {
    __typename?: 'Query';

    week?: Week | null;
  };

  export type Week = {
    __typename?: 'Plan';

    id: string;

    shoppingList: ShoppingList;
  };

  export type ShoppingList = ShoppingListView.Fragment;
}

export namespace MarkPurchased {
  export type Variables = {
    ingredientId: string;
    value: number;
    unit?: string | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    markPurchased: MarkPurchased;
  };

  export type MarkPurchased = ShoppingListView.Fragment;
}

export namespace UserInfo {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: 'Query';

    user?: User | null;
  };

  export type User = {
    __typename?: 'User';

    id: string;

    name?: string | null;

    nickname?: string | null;

    recipes: Recipes[];

    discoveredRecipes: DiscoveredRecipes[];

    draftRecipes: DraftRecipes[];

    likedRecipes: LikedRecipes[];
  };

  export type Recipes = RecipeCard.Fragment;

  export type DiscoveredRecipes = RecipeCard.Fragment;

  export type DraftRecipes = RecipeCard.Fragment;

  export type LikedRecipes = RecipeCard.Fragment;
}

export namespace MergeUser {
  export type Variables = {};

  export type Mutation = {
    __typename?: 'Mutation';

    mergeUser?: MergeUser | null;
  };

  export type MergeUser = {
    __typename?: 'User';

    id: string;

    name?: string | null;

    email?: string | null;
  };
}

export namespace CalendarPlanAction {
  export type Fragment = {
    __typename?: 'PlanAction';

    id: string;

    type: PlanActionType;
  } & (PlanActionCookInlineFragment | PlanActionEatInlineFragment);

  export type PlanActionCookInlineFragment = {
    __typename?: 'PlanActionCook';

    servings: number;

    mealType: PlanMealType;

    recipe?: Recipe | null;
  };

  export type Recipe = {
    __typename?: 'Recipe';

    id: string;

    title: string;

    coverImage?: CoverImage | null;
  };

  export type CoverImage = {
    __typename?: 'Image';

    id: string;

    url: string;
  };

  export type PlanActionEatInlineFragment = {
    __typename?: 'PlanActionEat';

    cookAction?: CookAction | null;
  };

  export type CookAction = {
    __typename?: 'PlanActionCook';

    id: string;

    dayIndex?: number | null;

    recipe?: _Recipe | null;
  };

  export type _Recipe = {
    __typename?: 'Recipe';

    id: string;

    title: string;

    coverImage?: _CoverImage | null;
  };

  export type _CoverImage = {
    __typename?: 'Image';

    id: string;

    url: string;
  };
}

export namespace CalendarMeal {
  export type Fragment = {
    __typename?: 'PlanMeal';

    id: string;

    actions: Actions[];
  };

  export type Actions = {
    __typename?: 'PlanAction';

    id: string;

    type: PlanActionType;
  } & CalendarPlanAction.Fragment;
}

export namespace CalendarDayViewMeals {
  export type Fragment = CalendarMeal.Fragment;
}

export namespace CalendarDay {
  export type Fragment = {
    __typename?: 'PlanDay';

    id: string;

    date?: Date | null;

    meals: Meals[];
  };

  export type Meals = CalendarMeal.Fragment;
}

export namespace RecipeSpotlight {
  export type Fragment = {
    __typename?: 'Recipe';

    description?: string | null;

    attribution?: string | null;

    author?: Author | null;
  } & LikeButton.Fragment;

  export type Author = {
    __typename?: 'User';

    id: string;

    name?: string | null;
  };
}

export namespace LikeButton {
  export type Fragment = {
    __typename?: 'Recipe';

    id: string;

    yourLike?: YourLike | null;
  };

  export type YourLike = {
    __typename?: 'LikeInfo';

    id: string;

    likedAt?: string | null;
  };
}

export namespace RecipeCard {
  export type Fragment = {
    __typename?: 'Recipe';

    id: string;

    title: string;

    coverImage?: CoverImage | null;
  } & LikeButton.Fragment;

  export type CoverImage = {
    __typename?: 'Image';

    id: string;

    url: string;
  };
}

export namespace ShoppingListView {
  export type Fragment = {
    __typename?: 'ShoppingList';

    ingredients: Ingredients[];
  };

  export type Ingredients = {
    __typename?: 'ShoppingListIngredient';

    totalValue: number;

    unit?: string | null;

    purchasedValue: number;

    ingredient: Ingredient;

    recipes: Recipes[];
  };

  export type Ingredient = {
    __typename?: 'Ingredient';

    id: string;

    name: string;
  };

  export type Recipes = {
    __typename?: 'Recipe';

    id: string;

    title: string;
  };
}
