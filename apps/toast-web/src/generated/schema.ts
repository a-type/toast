/* tslint:disable */
/** Generated in 2018-11-13T22:13:00-05:00 */

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

  scheduleStartWeekDate: Date;

  schedule?: Schedule | null;

  planWeekIndex: number;

  week?: PlanWeek | null;

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

  schedule?: Schedule | null;
}

export interface Schedule {
  id: string;

  defaultServings: number;

  meals: ScheduleMeal[];

  groceryDay: number;

  warnings: string[];

  strategy?: PlanStrategy | null;

  previewWeek: PlanWeek;

  week?: PlanWeek | null;
}

export interface ScheduleMeal {
  id: string;

  availability: ScheduleAvailability;

  dayIndex: number;

  mealIndex: number;
}

export interface PlanWeek {
  id: string;

  weekIndex: number;

  startDay: number;

  startMeal: number;

  mealsPerDay: number;

  startDate: Date;

  meals: PlanWeekMeal[];

  shoppingList: ShoppingList;
}

export interface PlanWeekMeal {
  id: string;

  weekIndex: number;

  mealIndex: number;

  dayIndex: number;

  date: Date;

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

  setScheduleDetails: Schedule;

  setScheduleMealDetails: Schedule;

  setScheduleStrategy: Schedule;

  setWeekActionRecipe: PlanAction;

  markPurchased: ShoppingList;

  markUnpurchased: ShoppingList;

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

  mealType: ScheduleMealType;

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

export interface ScheduleSetDetailsInput {
  defaultServings?: number | null;

  groceryDay?: number | null;
}

export interface ScheduleSetMealDetailsInput {
  availability?: ScheduleAvailability | null;
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
export interface PreviewWeekScheduleArgs {
  strategy: PlanStrategy;
}
export interface WeekScheduleArgs {
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
export interface SetScheduleDetailsMutationArgs {
  details: ScheduleSetDetailsInput;
}
export interface SetScheduleMealDetailsMutationArgs {
  dayIndex: number;

  mealIndex: number;

  details: ScheduleSetMealDetailsInput;
}
export interface SetScheduleStrategyMutationArgs {
  strategy?: PlanStrategy | null;
}
export interface SetWeekActionRecipeMutationArgs {
  weekIndex: number;

  actionId: string;

  recipeId: string;
}
export interface MarkPurchasedMutationArgs {
  ingredientId: string;
}
export interface MarkUnpurchasedMutationArgs {
  ingredientId: string;
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

export enum ScheduleAvailability {
  SKIP = 'SKIP',
  EAT_OUT = 'EAT_OUT',
  NONE = 'NONE',
  SHORT = 'SHORT',
  MEDIUM = 'MEDIUM',
  LONG = 'LONG',
}

export enum PlanStrategy {
  BASIC = 'BASIC',
  PREP = 'PREP',
  BIG_PREP = 'BIG_PREP',
}

export enum PlanActionType {
  EAT_OUT = 'EAT_OUT',
  COOK = 'COOK',
  EAT = 'EAT',
  READY_MADE = 'READY_MADE',
  SKIP = 'SKIP',
}

export enum CacheControlScope {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum ScheduleMealType {
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
    actionId: string;
    recipeId: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    setWeekActionRecipe: SetWeekActionRecipe;
  };

  export type SetWeekActionRecipe = {
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

    schedule?: Schedule | null;

    week?: Week | null;
  };

  export type Schedule = {
    __typename?: 'Schedule';

    id: string;

    groceryDay: number;
  };

  export type Week = {
    __typename?: 'PlanWeek';

    startDate: Date;

    id: string;

    meals: Meals[];
  };

  export type Meals = {
    __typename?: 'PlanWeekMeal';

    id: string;

    weekIndex: number;

    dayIndex: number;

    mealIndex: number;
  } & CalendarMeal.Fragment;
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

    scheduleStartWeekDate: Date;
  };
}

export namespace PreviewWeek {
  export type Variables = {
    strategy: PlanStrategy;
  };

  export type Query = {
    __typename?: 'Query';

    schedule?: Schedule | null;
  };

  export type Schedule = {
    __typename?: 'Schedule';

    id: string;

    previewWeek: PreviewWeek;
  };

  export type PreviewWeek = {
    __typename?: 'PlanWeek';

    id: string;
  } & PlanPreview.Fragment;
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

export namespace ScheduleQuery {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    schedule?: Schedule | null;
  };

  export type Schedule =
    | {
        __typename?: 'Schedule';

        id: string;
      } & EditDetails.Fragment
    | EditAvailability.Fragment;
}

export namespace SetMealDetails {
  export type Variables = {
    dayIndex: number;
    mealIndex: number;
    details: ScheduleSetMealDetailsInput;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    setScheduleMealDetails: SetScheduleMealDetails;
  };

  export type SetScheduleMealDetails = {
    __typename?: 'Schedule';

    id: string;

    meals: Meals[];
  };

  export type Meals = {
    __typename?: 'ScheduleMeal';

    id: string;
  } & DayRowMeal.Fragment;
}

export namespace SetScheduleDetails {
  export type Variables = {
    details: ScheduleSetDetailsInput;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    setScheduleDetails: SetScheduleDetails;
  };

  export type SetScheduleDetails = EditDetails.Fragment;
}

export namespace ProcessSchedule {
  export type Variables = {
    strategy: PlanStrategy;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    setScheduleStrategy: SetScheduleStrategy;
  };

  export type SetScheduleStrategy = {
    __typename?: 'Schedule';

    id: string;

    strategy?: PlanStrategy | null;
  };
}

export namespace GetSchedule {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    me?: Me | null;
  };

  export type Me = {
    __typename?: 'User';

    group?: Group | null;
  };

  export type Group = {
    __typename?: 'Group';

    schedule?: Schedule | null;
  };

  export type Schedule = {
    __typename?: 'Schedule';

    id: string;

    strategy?: PlanStrategy | null;
  };
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
    __typename?: 'PlanWeek';

    id: string;

    shoppingList: ShoppingList;
  };

  export type ShoppingList = ShoppingListView.Fragment;
}

export namespace MarkPurchased {
  export type Variables = {
    ingredientId: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    markPurchased: MarkPurchased;
  };

  export type MarkPurchased = ShoppingListView.Fragment;
}

export namespace MarkUnpurchased {
  export type Variables = {
    ingredientId: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    markUnpurchased: MarkUnpurchased;
  };

  export type MarkUnpurchased = ShoppingListView.Fragment;
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

    mealType: ScheduleMealType;

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
    __typename?: 'PlanWeekMeal';

    id: string;

    date: Date;

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

export namespace PlanPreviewMeal {
  export type Fragment = {
    __typename?: 'PlanWeekMeal';

    id: string;

    dayIndex: number;

    mealIndex: number;

    actions: Actions[];
  };

  export type Actions = {
    __typename?:
      | PlanActionCookInlineFragment['__typename']
      | PlanActionEatInlineFragment['__typename'];

    id: string;

    type: PlanActionType;
  } & (PlanActionCookInlineFragment | PlanActionEatInlineFragment);

  export type PlanActionCookInlineFragment = {
    __typename?: 'PlanActionCook';

    servings: number;

    mealType: ScheduleMealType;

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

    leftovers: boolean;

    cookAction?: CookAction | null;
  };

  export type CookAction = {
    __typename?: 'PlanActionCook';

    id: string;

    dayIndex?: number | null;
  };
}

export namespace PlanPreview {
  export type Fragment = {
    __typename?: 'PlanWeek';

    id: string;

    meals: Meals[];
  };

  export type Meals = PlanPreviewMeal.Fragment;
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

export namespace DayRowMeal {
  export type Fragment = {
    __typename?: 'ScheduleMeal';

    id: string;

    availability: ScheduleAvailability;

    dayIndex: number;

    mealIndex: number;
  };
}

export namespace EditAvailability {
  export type Fragment = {
    __typename?: 'Schedule';

    id: string;

    meals: Meals[];
  };

  export type Meals = DayRowMeal.Fragment;
}

export namespace EditDetails {
  export type Fragment = {
    __typename?: 'Schedule';

    id: string;

    defaultServings: number;
  };
}

export namespace ShoppingListView {
  export type Fragment = {
    __typename?: 'ShoppingList';

    id: string;

    ingredients: Ingredients[];
  };

  export type Ingredients = {
    __typename?: 'ShoppingListIngredient';

    totalValue: number;

    unit?: string | null;

    purchasedValue: number;

    ingredient: Ingredient;
  };

  export type Ingredient = {
    __typename?: 'Ingredient';

    id: string;

    name: string;
  };
}
