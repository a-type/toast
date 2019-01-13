/* tslint:disable */
/** Generated in 2019-01-13T16:29:02-05:00 */

// ====================================================
// START: Typescript template
// ====================================================

// ====================================================
// Scalars
// ====================================================

export type WeekDay = any;

export type Date = any;

export type Upload = any;

// ====================================================
// Interfaces
// ====================================================

export interface MealAction {
  id: string;

  type: MealActionType;

  dayIndex?: WeekDay | null;

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

  group?: Group | null;

  plan?: Plan | null;

  schedule?: Schedule | null;

  recipeIngredientCorrections: RecipeIngredientCorrection[];

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

  ingredientStart?: number | null;

  ingredientEnd?: number | null;

  recipe: Recipe;

  unit?: string | null;

  unitStart?: number | null;

  unitEnd?: number | null;

  value: number;

  valueStart?: number | null;

  valueEnd?: number | null;

  index: number;

  comments: string[];

  preparations: string[];

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

  groceryDay: WeekDay;

  meal: PlanMeal;

  meals: PlanMeal[];

  schedule?: Schedule | null;

  shoppingList: ShoppingList;
}

export interface PlanMeal {
  id: string;

  mealIndex: number;

  dateIndex: number;

  dayIndex: WeekDay;

  date: Date;

  actions: MealAction[];
}

export interface Schedule {
  id: string;

  defaultServings: number;

  meals: ScheduleMeal[];

  warnings: string[];

  strategy?: ScheduleStrategy | null;

  templateWeek: PlanMeal[];
}

export interface ScheduleMeal {
  id: string;

  availability: ScheduleAvailability;

  dayIndex: WeekDay;

  mealIndex: number;
}

export interface ShoppingList {
  id: string;

  startDate: Date;

  endDate: Date;

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

export interface RecipeIngredientCorrection {
  id: string;

  status?: CorrectionStatus | null;

  recipeIngredientId: string;

  correctedValue: RecipeIngredientCorrectedValue;
}

export interface RecipeIngredientCorrectedValue {
  unit?: string | null;

  unitStart?: number | null;

  unitEnd?: number | null;

  value?: number | null;

  valueStart?: number | null;

  valueEnd?: number | null;

  ingredientStart?: number | null;

  ingredientEnd?: number | null;

  ingredient?: Ingredient | null;
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

  linkRecipe: RecipeLinkResult;

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

  createPlan: Plan;

  setGroceryDay: Plan;

  setPlanMealRecipe: MealAction;

  setScheduleDetails: Schedule;

  setScheduleMealDetails: Schedule;

  setScheduleStrategy: Schedule;

  markPurchased: ShoppingList;

  markUnpurchased: ShoppingList;

  submitRecipeIngredientCorrection: string;

  showMessage?: Message | null;

  dismissMessage?: number | null;

  dismissPromotion: string;

  setPreferredServings: number;

  setSearchInputValue: string;

  addSearchFilter: SearchFilter;

  removeSearchFilter?: SearchFilter | null;

  resetSearch?: number | null;
}

export interface RecipeLinkResult {
  recipe: Recipe;

  problems: RecipeLinkProblem[];
}

export interface MealActionCook extends MealAction {
  id: string;

  type: MealActionType;

  dayIndex?: WeekDay | null;

  mealIndex?: number | null;

  servings: number;

  recipeType: MealRecipeType;

  recipe?: Recipe | null;

  recipeId?: string | null;
}

export interface MealActionEat extends MealAction {
  id: string;

  type: MealActionType;

  dayIndex?: WeekDay | null;

  mealIndex?: number | null;

  leftovers: boolean;

  cookAction?: MealActionCook | null;
}

export interface MealActionEatOut extends MealAction {
  id: string;

  type: MealActionType;

  dayIndex?: WeekDay | null;

  mealIndex?: number | null;

  note?: string | null;
}

export interface MealActionReadyMade extends MealAction {
  id: string;

  type: MealActionType;

  dayIndex?: WeekDay | null;

  mealIndex?: number | null;

  note?: string | null;
}

export interface MealActionSkip extends MealAction {
  id: string;

  type: MealActionType;

  dayIndex?: WeekDay | null;

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
  url: string;
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

  unitStart?: number | null;

  unitEnd?: number | null;

  value?: number | null;

  valueStart?: number | null;

  valueEnd?: number | null;

  ingredientId?: string | null;

  ingredientStart?: number | null;

  ingredientEnd?: number | null;

  comments?: string[] | null;

  preparations?: string[] | null;
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
}

export interface ScheduleSetMealDetailsInput {
  availability?: ScheduleAvailability | null;
}

export interface RecipeIngredientCorrectionSubmitInput {
  recipeIngredientId: string;

  correctedValue: RecipeIngredientCorrectedValueInput;
}

export interface RecipeIngredientCorrectedValueInput {
  unit?: string | null;

  unitStart?: number | null;

  unitEnd?: number | null;

  value?: number | null;

  valueStart?: number | null;

  valueEnd?: number | null;

  ingredientId?: string | null;

  ingredientStart?: number | null;

  ingredientEnd?: number | null;
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
export interface ScheduleQueryArgs {
  scheduleId?: string | null;
}
export interface RecipeIngredientCorrectionsQueryArgs {
  pagination?: ListPaginationInput | null;
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
export interface MealPlanArgs {
  date: Date;

  mealIndex: number;
}
export interface MealsPlanArgs {
  startDate: Date;

  endDate?: Date | null;
}
export interface SchedulePlanArgs {
  scheduleId?: string | null;
}
export interface TemplateWeekScheduleArgs {
  strategy: ScheduleStrategy;
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
export interface SetGroceryDayMutationArgs {
  groceryDay: number;
}
export interface SetPlanMealRecipeMutationArgs {
  dateIndex: number;

  mealIndex: number;

  actionId: string;

  recipeId: string;
}
export interface SetScheduleDetailsMutationArgs {
  scheduleId?: string | null;

  details: ScheduleSetDetailsInput;
}
export interface SetScheduleMealDetailsMutationArgs {
  scheduleId?: string | null;

  dayIndex: WeekDay;

  mealIndex: number;

  details: ScheduleSetMealDetailsInput;
}
export interface SetScheduleStrategyMutationArgs {
  scheduleId?: string | null;

  strategy?: ScheduleStrategy | null;
}
export interface MarkPurchasedMutationArgs {
  ingredientId: string;
}
export interface MarkUnpurchasedMutationArgs {
  ingredientId: string;
}
export interface SubmitRecipeIngredientCorrectionMutationArgs {
  input: RecipeIngredientCorrectionSubmitInput;
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

export enum MealActionType {
  EAT_OUT = 'EAT_OUT',
  COOK = 'COOK',
  EAT = 'EAT',
  READY_MADE = 'READY_MADE',
  SKIP = 'SKIP',
}

export enum ScheduleAvailability {
  SKIP = 'SKIP',
  EAT_OUT = 'EAT_OUT',
  NONE = 'NONE',
  SHORT = 'SHORT',
  MEDIUM = 'MEDIUM',
  LONG = 'LONG',
}

export enum ScheduleStrategy {
  BASIC = 'BASIC',
  PREP = 'PREP',
  BIG_PREP = 'BIG_PREP',
}

export enum CorrectionStatus {
  Submitted = 'Submitted',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export enum RecipeLinkProblem {
  FailedIngredients = 'FailedIngredients',
  IncompleteIngredients = 'IncompleteIngredients',
  FailedImage = 'FailedImage',
}

export enum CacheControlScope {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum MealRecipeType {
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

export namespace IngredientPickerSuggestions {
  export type Variables = {
    input: IngredientSearchInput;
  };

  export type Query = {
    __typename?: 'Query';

    searchIngredients: SearchIngredients;
  };

  export type SearchIngredients = {
    __typename?: 'IngredientSearchResponse';

    items: (Items | null)[];
  };

  export type Items = {
    __typename?: 'Ingredient';

    id: string;

    name: string;
  };
}

export namespace PickerCreateIngredient {
  export type Variables = {
    name: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    createIngredient: CreateIngredient;
  };

  export type CreateIngredient = {
    __typename?: 'Ingredient';

    id: string;

    name: string;
  };
}

export namespace CalendarMealSetRecipe {
  export type Variables = {
    dateIndex: number;
    mealIndex: number;
    actionId: string;
    recipeId: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    setPlanMealRecipe: SetPlanMealRecipe;
  };

  export type SetPlanMealRecipe = {
    __typename?: 'MealAction';

    id: string;
  } & CalendarMealAction.Fragment;
}

export namespace RecipeCookActionPreview {
  export type Variables = {
    recipeId: string;
  };

  export type Query = {
    __typename?: 'Query';

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
}

export namespace Calendar {
  export type Variables = {
    startDate: Date;
    endDate: Date;
  };

  export type Query = {
    __typename?: 'Query';

    group?: Group | null;
  };

  export type Group = {
    __typename?: 'Group';

    id: string;

    plan?: Plan | null;
  };

  export type Plan = {
    __typename?: 'Plan';

    id: string;

    meals: Meals[];
  } & CalendarPlan.Fragment;

  export type Meals = {
    __typename?: 'PlanMeal';

    id: string;
  } & CalendarMeals.Fragment;
}

export namespace DayView {
  export type Variables = {
    startDate: Date;
    endDate: Date;
  };

  export type Query = {
    __typename?: 'Query';

    group?: Group | null;
  };

  export type Group = {
    __typename?: 'Group';

    id: string;

    plan?: Plan | null;
  };

  export type Plan = {
    __typename?: 'Plan';

    id: string;

    meals: Meals[];
  } & CalendarPlan.Fragment;

  export type Meals =
    | {
        __typename?: 'PlanMeal';

        id: string;
      } & CalendarMeals.Fragment
    | CalendarDayViewMeals.Fragment;
}

export namespace GroceryDay {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    group?: Group | null;
  };

  export type Group = {
    __typename?: 'Group';

    plan?: Plan | null;
  };

  export type Plan = {
    __typename?: 'Plan';

    id: string;

    groceryDay: WeekDay;
  };
}

export namespace SetGroceryDay {
  export type Variables = {
    groceryDay: number;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    setGroceryDay: SetGroceryDay;
  };

  export type SetGroceryDay = {
    __typename?: 'Plan';

    id: string;

    groceryDay: WeekDay;
  };
}

export namespace PreviewWeek {
  export type Variables = {
    strategy: ScheduleStrategy;
  };

  export type Query = {
    __typename?: 'Query';

    schedule?: Schedule | null;
  };

  export type Schedule = {
    __typename?: 'Schedule';

    id: string;

    templateWeek: TemplateWeek[];
  };

  export type TemplateWeek = {
    __typename?: 'PlanMeal';

    id: string;
  } & PlanPreviewMeal.Fragment;
}

export namespace CalendarPlan {
  export type Variables = {
    startDate: Date;
    endDate?: Date | null;
  };

  export type Query = {
    __typename?: 'Query';

    group?: Group | null;
  };

  export type Group = {
    __typename?: 'Group';

    plan?: Plan | null;
  };

  export type Plan = {
    __typename?: 'Plan';

    id: string;

    groceryDay: WeekDay;

    schedule?: Schedule | null;

    meals: Meals[];
  };

  export type Schedule = {
    __typename?: 'Schedule';

    id: string;
  };

  export type Meals = {
    __typename?: 'PlanMeal';

    id: string;

    date: Date;

    dayIndex: WeekDay;

    mealIndex: number;
  } & CalendarMeal.Fragment;
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

export namespace CreatePlan {
  export type Variables = {};

  export type Mutation = {
    __typename?: 'Mutation';

    createPlan: CreatePlan;
  };

  export type CreatePlan = {
    __typename?: 'Plan';

    id: string;
  };
}

export namespace CorrectIngredient {
  export type Variables = {
    input: RecipeIngredientCorrectionSubmitInput;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    submitRecipeIngredientCorrection: string;
  };
}

export namespace DeleteIngredient {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    deleteRecipeIngredient: DeleteRecipeIngredient;
  };

  export type DeleteRecipeIngredient = {
    __typename?: 'Recipe';

    id: string;

    ingredients: Ingredients[];
  };

  export type Ingredients = {
    __typename?: 'RecipeIngredient';

    id: string;
  };
}

export namespace FixIngredient {
  export type Variables = {
    id: string;
    input: RecipeIngredientUpdateInput;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    updateRecipeIngredient: UpdateRecipeIngredient;
  };

  export type UpdateRecipeIngredient = FixRecipeIngredient.Fragment;
}

export namespace DoParseIngredient {
  export type Variables = {
    recipeId: string;
    text: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    addRecipeIngredient: AddRecipeIngredient;
  };

  export type AddRecipeIngredient = {
    __typename?: 'Recipe';

    id: string;

    ingredients: Ingredients[];
  };

  export type Ingredients = ParseIngredient.Fragment;
}

export namespace DoReparseIngredient {
  export type Variables = {
    id: string;
    text: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    reparseRecipeIngredient: ReparseRecipeIngredient;
  };

  export type ReparseRecipeIngredient = ParseIngredient.Fragment;
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

export namespace LinkRecipe {
  export type Variables = {
    url: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    linkRecipe: LinkRecipe;
  };

  export type LinkRecipe = {
    __typename?: 'RecipeLinkResult';

    recipe: Recipe;

    problems: RecipeLinkProblem[];
  };

  export type Recipe = {
    __typename?: 'Recipe';

    id: string;
  };
}

export namespace FullRecipe {
  export type Variables = {
    recipeId: string;
  };

  export type Query = {
    __typename?: 'Query';

    recipe?: Recipe | null;

    me?: Me | null;
  };

  export type Recipe =
    | {
        __typename?: 'Recipe';

        id: string;

        published: boolean;

        displayType?: RecipeDisplayType | null;

        ingredients: Ingredients[];

        steps: Steps[];

        coverImage?: CoverImage | null;
      } & RecipeDetails.Fragment
    | RecipeSpotlight.Fragment;

  export type Ingredients = {
    __typename?: 'RecipeIngredient';

    id: string;

    unit?: string | null;

    unitStart?: number | null;

    unitEnd?: number | null;

    value: number;

    valueStart?: number | null;

    valueEnd?: number | null;

    text: string;

    ingredientStart?: number | null;

    ingredientEnd?: number | null;

    index: number;

    comments: string[];

    preparations: string[];

    ingredient: Ingredient;
  };

  export type Ingredient = {
    __typename?: 'Ingredient';

    id: string;

    name: string;
  };

  export type Steps = {
    __typename?: 'RecipeStep';

    id: string;

    index: number;

    step: Step;
  };

  export type Step = {
    __typename?: 'Step';

    id: string;

    text: string;
  };

  export type CoverImage = {
    __typename?: 'Image';

    id: string;

    url: string;

    attribution?: string | null;
  };

  export type Me = {
    __typename?: 'User';

    id: string;
  };
}

export namespace RecipeCard {
  export type Variables = {
    recipeId: string;
  };

  export type Query = {
    __typename?: 'Query';

    recipe?: Recipe | null;
  };

  export type Recipe = {
    __typename?: 'Recipe';

    id: string;
  } & RecipeCard.Fragment;
}

export namespace GetPreferredServings {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    preferredServings?: number | null;
  };
}

export namespace SetPreferredServings {
  export type Variables = {
    servings: number;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    setPreferredServings: number;
  };
}

export namespace IngredientGetPreferredServings {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    preferredServings?: number | null;
  };
}

export namespace RecordView {
  export type Variables = {
    recipeId: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    recordRecipeView?: RecordRecipeView | null;
  };

  export type RecordRecipeView = {
    __typename?: 'Recipe';

    id: string;

    views: number;
  };
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
    dayIndex: WeekDay;
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
    strategy: ScheduleStrategy;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    setScheduleStrategy: SetScheduleStrategy;
  };

  export type SetScheduleStrategy = {
    __typename?: 'Schedule';

    id: string;

    strategy?: ScheduleStrategy | null;
  };
}

export namespace GetSchedule {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    schedule?: Schedule | null;
  };

  export type Schedule = {
    __typename?: 'Schedule';

    id: string;

    strategy?: ScheduleStrategy | null;
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
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    plan?: Plan | null;
  };

  export type Plan = {
    __typename?: 'Plan';

    id: string;

    groceryDay: WeekDay;

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

export namespace ShowMessage {
  export type Variables = {
    contents: (string | null)[];
  };

  export type Mutation = {
    __typename?: 'Mutation';

    showMessage?: ShowMessage | null;
  };

  export type ShowMessage = {
    __typename?: 'Message';

    id: string;

    contents: (string | null)[];
  };
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

export namespace CalendarMealCookAction {
  export type Fragment = {
    __typename?: 'MealActionCook';

    servings: number;

    recipeType: MealRecipeType;

    recipeId?: string | null;
  };
}

export namespace CalendarMealEatAction {
  export type Fragment = {
    __typename?: 'MealActionEat';

    cookAction?: CookAction | null;
  };

  export type CookAction = {
    __typename?: 'MealActionCook';

    id: string;

    dayIndex?: WeekDay | null;

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
}

export namespace CalendarMealAction {
  export type Fragment =
    | {
        __typename?: 'MealAction';

        id: string;

        type: MealActionType;
      } & CalendarMealCookAction.Fragment
    | CalendarMealEatAction.Fragment;
}

export namespace CalendarPlan {
  export type Fragment = {
    __typename?: 'Plan';

    id: string;

    groceryDay: WeekDay;
  };
}

export namespace CalendarMeals {
  export type Fragment = {
    __typename?: 'PlanMeal';

    id: string;

    date: Date;

    dateIndex: number;

    actions: Actions[];
  };

  export type Actions = {
    __typename?: 'MealAction';

    id: string;

    type: MealActionType;
  };
}

export namespace CalendarDayViewMeals {
  export type Fragment = {
    __typename?: 'PlanMeal';

    id: string;
  } & CalendarMeal.Fragment;
}

export namespace CalendarDayViewMealsMeal {
  export type Fragment = CalendarMeal.Fragment;
}

export namespace CalendarMeal {
  export type Fragment = {
    __typename?: 'PlanMeal';

    id: string;

    date: Date;

    dayIndex: WeekDay;

    dateIndex: number;

    mealIndex: number;

    actions: Actions[];
  };

  export type Actions = {
    __typename?: 'MealAction';

    id: string;

    type: MealActionType;
  } & CalendarMealAction.Fragment;
}

export namespace PlanPreviewMeal {
  export type Fragment = {
    __typename?: 'PlanMeal';

    id: string;

    dayIndex: WeekDay;

    dateIndex: number;

    mealIndex: number;

    actions: Actions[];
  };

  export type Actions = {
    __typename?:
      | MealActionCookInlineFragment['__typename']
      | MealActionEatInlineFragment['__typename'];

    id: string;

    type: MealActionType;
  } & (MealActionCookInlineFragment | MealActionEatInlineFragment);

  export type MealActionCookInlineFragment = {
    __typename?: 'MealActionCook';

    servings: number;

    recipeType: MealRecipeType;

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

  export type MealActionEatInlineFragment = {
    __typename?: 'MealActionEat';

    leftovers: boolean;

    cookAction?: CookAction | null;
  };

  export type CookAction = {
    __typename?: 'MealActionCook';

    id: string;

    dayIndex?: WeekDay | null;
  };
}

export namespace RecipeSpotlight {
  export type Fragment = {
    __typename?: 'Recipe';

    description?: string | null;

    attribution?: string | null;

    author?: Author | null;

    coverImage?: CoverImage | null;
  } & LikeButton.Fragment;

  export type Author = {
    __typename?: 'User';

    id: string;

    name?: string | null;
  };

  export type CoverImage = {
    __typename?: 'Image';

    id: string;

    url: string;
  };
}

export namespace FixRecipeIngredient {
  export type Fragment = {
    __typename?: 'RecipeIngredient';

    id: string;

    index: number;

    text: string;

    unit?: string | null;

    unitStart?: number | null;

    unitEnd?: number | null;

    value: number;

    valueStart?: number | null;

    valueEnd?: number | null;

    ingredientStart?: number | null;

    ingredientEnd?: number | null;

    ingredient: Ingredient;
  };

  export type Ingredient = {
    __typename?: 'Ingredient';

    id: string;

    name: string;
  };
}

export namespace ParseIngredient {
  export type Fragment = {
    __typename?: 'RecipeIngredient';

    id: string;

    index: number;

    text: string;

    unit?: string | null;

    unitStart?: number | null;

    unitEnd?: number | null;

    value: number;

    valueStart?: number | null;

    valueEnd?: number | null;

    ingredientStart?: number | null;

    ingredientEnd?: number | null;

    ingredient: Ingredient;
  };

  export type Ingredient = {
    __typename?: 'Ingredient';

    id: string;

    name: string;
  };
}

export namespace RecipeCreateIngredients {
  export type Fragment = {
    __typename?: 'Recipe';

    id: string;

    ingredients: Ingredients[];
  };

  export type Ingredients =
    | ParseIngredient.Fragment
    | FixRecipeIngredient.Fragment;
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

export namespace RecipeDetails {
  export type Fragment = {
    __typename?: 'Recipe';

    id: string;

    title: string;

    description?: string | null;

    attribution?: string | null;

    sourceUrl?: string | null;

    servings: number;

    cookTime?: number | null;

    prepTime?: number | null;

    unattendedTime?: number | null;

    author?: Author | null;
  };

  export type Author = {
    __typename?: 'User';

    id: string;

    name?: string | null;
  };
}

export namespace DayRowMeal {
  export type Fragment = {
    __typename?: 'ScheduleMeal';

    id: string;

    availability: ScheduleAvailability;

    dayIndex: WeekDay;

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
