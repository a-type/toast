/* tslint:disable */
/** Generated in 2018-10-24T21:53:59-04:00 */
import { GraphQLResolveInfo } from 'graphql';

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo,
) => Promise<Result> | Result;

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
  ): R | Result | Promise<R | Result>;
};

export type Date = any;

export type Upload = any;

export interface PlanAction {
  id: string;
  type: PlanActionType;
}

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
  servings: number;
  mealType: PlanMealType;
}

export interface PlanActionEat extends PlanAction {
  id: string;
  type: PlanActionType;
  leftovers: boolean;
  cookAction: PlanActionCook;
}

export interface PlanActionEatOut extends PlanAction {
  id: string;
  type: PlanActionType;
  note?: string | null;
}

export interface PlanActionReadyMade extends PlanAction {
  id: string;
  type: PlanActionType;
  note?: string | null;
}

export interface PlanActionSkip extends PlanAction {
  id: string;
  type: PlanActionType;
}

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
  actionId: string;
  recipeId: string;
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

export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    hello?: HelloResolver<string, any, Context>;
    ingredients?: IngredientsResolver<Ingredient[], any, Context>;
    ingredient?: IngredientResolver<Ingredient | null, any, Context>;
    recipes?: RecipesResolver<Recipe[], any, Context>;
    recipe?: RecipeResolver<Recipe | null, any, Context>;
    searchRecipes?: SearchRecipesResolver<RecipeSearchResponse, any, Context>;
    searchIngredients?: SearchIngredientsResolver<
      IngredientSearchResponse,
      any,
      Context
    >;
    me?: MeResolver<User | null, any, Context>;
    user?: UserResolver<User | null, any, Context>;
    planWeekIndex?: PlanWeekIndexResolver<number, any, Context>;
    planStartWeekDate?: PlanStartWeekDateResolver<Date, any, Context>;
    messages?: MessagesResolver<Message[], any, Context>;
    promotions?: PromotionsResolver<string[], any, Context>;
    preferredServings?: PreferredServingsResolver<number | null, any, Context>;
    searchFilters?: SearchFiltersResolver<SearchFilter[], any, Context>;
    searchInputValue?: SearchInputValueResolver<string, any, Context>;
  }

  export type HelloResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type IngredientsResolver<
    R = Ingredient[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, IngredientsArgs>;
  export interface IngredientsArgs {
    pagination?: ListPaginationInput | null;
    sort?: IngredientListSortInput | null;
  }

  export type IngredientResolver<
    R = Ingredient | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, IngredientArgs>;
  export interface IngredientArgs {
    id: string;
  }

  export type RecipesResolver<
    R = Recipe[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, RecipesArgs>;
  export interface RecipesArgs {
    pagination?: ListPaginationInput | null;
  }

  export type RecipeResolver<
    R = Recipe | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, RecipeArgs>;
  export interface RecipeArgs {
    id: string;
  }

  export type SearchRecipesResolver<
    R = RecipeSearchResponse,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SearchRecipesArgs>;
  export interface SearchRecipesArgs {
    input: RecipeSearchInput;
  }

  export type SearchIngredientsResolver<
    R = IngredientSearchResponse,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SearchIngredientsArgs>;
  export interface SearchIngredientsArgs {
    input: IngredientSearchInput;
  }

  export type MeResolver<
    R = User | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = User | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UserArgs>;
  export interface UserArgs {
    id: string;
  }

  export type PlanWeekIndexResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, PlanWeekIndexArgs>;
  export interface PlanWeekIndexArgs {
    year: number;
    month: number;
    date: number;
  }

  export type PlanStartWeekDateResolver<
    R = Date,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type MessagesResolver<
    R = Message[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PromotionsResolver<
    R = string[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PreferredServingsResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type SearchFiltersResolver<
    R = SearchFilter[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type SearchInputValueResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace IngredientResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    description?: DescriptionResolver<string | null, any, Context>;
    attribution?: AttributionResolver<string | null, any, Context>;
    alternateNames?: AlternateNamesResolver<string[], any, Context>;
    recipes?: RecipesResolver<Recipe[], any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type DescriptionResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AttributionResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AlternateNamesResolver<
    R = string[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type RecipesResolver<
    R = Recipe[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, RecipesArgs>;
  export interface RecipesArgs {
    pagination?: ListPaginationInput | null;
  }
}

export namespace RecipeResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    title?: TitleResolver<string, any, Context>;
    description?: DescriptionResolver<string | null, any, Context>;
    attribution?: AttributionResolver<string | null, any, Context>;
    sourceUrl?: SourceUrlResolver<string | null, any, Context>;
    published?: PublishedResolver<boolean, any, Context>;
    displayType?: DisplayTypeResolver<RecipeDisplayType | null, any, Context>;
    servings?: ServingsResolver<number, any, Context>;
    cookTime?: CookTimeResolver<number | null, any, Context>;
    prepTime?: PrepTimeResolver<number | null, any, Context>;
    unattendedTime?: UnattendedTimeResolver<number | null, any, Context>;
    createdAt?: CreatedAtResolver<string, any, Context>;
    updatedAt?: UpdatedAtResolver<string, any, Context>;
    viewedAt?: ViewedAtResolver<string, any, Context>;
    views?: ViewsResolver<number, any, Context>;
    coverImage?: CoverImageResolver<Image | null, any, Context>;
    ingredients?: IngredientsResolver<RecipeIngredient[], any, Context>;
    steps?: StepsResolver<RecipeStep[], any, Context>;
    yourLike?: YourLikeResolver<LikeInfo | null, any, Context>;
    likes?: LikesResolver<number | null, any, Context>;
    author?: AuthorResolver<User | null, any, Context>;
    discoverer?: DiscovererResolver<User | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TitleResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type DescriptionResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AttributionResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type SourceUrlResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PublishedResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type DisplayTypeResolver<
    R = RecipeDisplayType | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ServingsResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type CookTimeResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PrepTimeResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UnattendedTimeResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type CreatedAtResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UpdatedAtResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ViewedAtResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ViewsResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CoverImageResolver<
    R = Image | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type IngredientsResolver<
    R = RecipeIngredient[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type StepsResolver<
    R = RecipeStep[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type YourLikeResolver<
    R = LikeInfo | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type LikesResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AuthorResolver<
    R = User | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type DiscovererResolver<
    R = User | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ImageResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    url?: UrlResolver<string, any, Context>;
    attribution?: AttributionResolver<string | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UrlResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AttributionResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace RecipeIngredientResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    text?: TextResolver<string, any, Context>;
    ingredientTextMatch?: IngredientTextMatchResolver<
      string | null,
      any,
      Context
    >;
    recipe?: RecipeResolver<Recipe, any, Context>;
    unit?: UnitResolver<string | null, any, Context>;
    unitTextMatch?: UnitTextMatchResolver<string | null, any, Context>;
    value?: ValueResolver<number, any, Context>;
    valueTextMatch?: ValueTextMatchResolver<string | null, any, Context>;
    index?: IndexResolver<number, any, Context>;
    ingredient?: IngredientResolver<Ingredient, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TextResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type IngredientTextMatchResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type RecipeResolver<
    R = Recipe,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UnitResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UnitTextMatchResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ValueResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ValueTextMatchResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type IndexResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type IngredientResolver<
    R = Ingredient,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace RecipeStepResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    index?: IndexResolver<number, any, Context>;
    step?: StepResolver<Step, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type IndexResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type StepResolver<R = Step, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace StepResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    text?: TextResolver<string, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TextResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace LikeInfoResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    likedAt?: LikedAtResolver<string | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type LikedAtResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace UserResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    name?: NameResolver<string | null, any, Context>;
    nickname?: NicknameResolver<string | null, any, Context>;
    email?: EmailResolver<string | null, any, Context>;
    recipes?: RecipesResolver<Recipe[], any, Context>;
    discoveredRecipes?: DiscoveredRecipesResolver<Recipe[], any, Context>;
    draftRecipes?: DraftRecipesResolver<Recipe[], any, Context>;
    likedRecipes?: LikedRecipesResolver<Recipe[], any, Context>;
    group?: GroupResolver<Group | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NicknameResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type RecipesResolver<
    R = Recipe[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, RecipesArgs>;
  export interface RecipesArgs {
    pagination?: ListPaginationInput | null;
  }

  export type DiscoveredRecipesResolver<
    R = Recipe[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DiscoveredRecipesArgs>;
  export interface DiscoveredRecipesArgs {
    pagination?: ListPaginationInput | null;
  }

  export type DraftRecipesResolver<
    R = Recipe[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DraftRecipesArgs>;
  export interface DraftRecipesArgs {
    pagination?: ListPaginationInput | null;
  }

  export type LikedRecipesResolver<
    R = Recipe[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, LikedRecipesArgs>;
  export interface LikedRecipesArgs {
    pagination?: ListPaginationInput | null;
  }

  export type GroupResolver<
    R = Group | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace GroupResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    members?: MembersResolver<User[], any, Context>;
    plan?: PlanResolver<Plan | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type MembersResolver<
    R = User[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PlanResolver<
    R = Plan | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace PlanResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    defaultServings?: DefaultServingsResolver<number, any, Context>;
    days?: DaysResolver<PlanDay[], any, Context>;
    groceryDay?: GroceryDayResolver<number, any, Context>;
    warnings?: WarningsResolver<string[], any, Context>;
    week?: WeekResolver<Plan | null, any, Context>;
    startDate?: StartDateResolver<Date | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type DefaultServingsResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type DaysResolver<
    R = PlanDay[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type GroceryDayResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type WarningsResolver<
    R = string[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type WeekResolver<
    R = Plan | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, WeekArgs>;
  export interface WeekArgs {
    weekIndex: number;
  }

  export type StartDateResolver<
    R = Date | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace PlanDayResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    date?: DateResolver<Date | null, any, Context>;
    meals?: MealsResolver<PlanMeal[], any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type DateResolver<
    R = Date | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type MealsResolver<
    R = PlanMeal[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace PlanMealResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    availability?: AvailabilityResolver<PrepAvailability, any, Context>;
    actions?: ActionsResolver<PlanAction[], any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AvailabilityResolver<
    R = PrepAvailability,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ActionsResolver<
    R = PlanAction[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace RecipeSearchResponseResolvers {
  export interface Resolvers<Context = any> {
    items?: ItemsResolver<(Recipe | null)[], any, Context>;
  }

  export type ItemsResolver<
    R = (Recipe | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace IngredientSearchResponseResolvers {
  export interface Resolvers<Context = any> {
    items?: ItemsResolver<(Ingredient | null)[], any, Context>;
  }

  export type ItemsResolver<
    R = (Ingredient | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace MessageResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    contents?: ContentsResolver<(string | null)[], any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ContentsResolver<
    R = (string | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace SearchFilterResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    type?: TypeResolver<string, any, Context>;
    subject?: SubjectResolver<string | null, any, Context>;
    display?: DisplayResolver<string | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TypeResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type SubjectResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type DisplayResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = any> {
    ping?: PingResolver<string, any, Context>;
    updateRecipeCoverImage?: UpdateRecipeCoverImageResolver<
      Recipe,
      any,
      Context
    >;
    createIngredient?: CreateIngredientResolver<Ingredient, any, Context>;
    updateIngredient?: UpdateIngredientResolver<Ingredient, any, Context>;
    deleteIngredient?: DeleteIngredientResolver<
      Ingredient | null,
      any,
      Context
    >;
    mergeIngredients?: MergeIngredientsResolver<
      Ingredient | null,
      any,
      Context
    >;
    createRecipe?: CreateRecipeResolver<Recipe, any, Context>;
    linkRecipe?: LinkRecipeResolver<Recipe, any, Context>;
    updateRecipeDetails?: UpdateRecipeDetailsResolver<
      Recipe | null,
      any,
      Context
    >;
    publishRecipe?: PublishRecipeResolver<Recipe | null, any, Context>;
    recordRecipeView?: RecordRecipeViewResolver<Recipe | null, any, Context>;
    updateRecipeIngredient?: UpdateRecipeIngredientResolver<
      RecipeIngredient,
      any,
      Context
    >;
    reparseRecipeIngredient?: ReparseRecipeIngredientResolver<
      RecipeIngredient,
      any,
      Context
    >;
    addRecipeIngredient?: AddRecipeIngredientResolver<Recipe, any, Context>;
    moveRecipeIngredient?: MoveRecipeIngredientResolver<Recipe, any, Context>;
    deleteRecipeIngredient?: DeleteRecipeIngredientResolver<
      Recipe,
      any,
      Context
    >;
    updateRecipeStep?: UpdateRecipeStepResolver<RecipeStep, any, Context>;
    createRecipeStep?: CreateRecipeStepResolver<Recipe, any, Context>;
    moveRecipeStep?: MoveRecipeStepResolver<Recipe, any, Context>;
    deleteRecipeStep?: DeleteRecipeStepResolver<Recipe, any, Context>;
    likeRecipe?: LikeRecipeResolver<Recipe, any, Context>;
    unlikeRecipe?: UnlikeRecipeResolver<Recipe, any, Context>;
    mergeUser?: MergeUserResolver<User | null, any, Context>;
    setPlanDetails?: SetPlanDetailsResolver<Plan, any, Context>;
    setPlanMealDetails?: SetPlanMealDetailsResolver<Plan, any, Context>;
    setPlanStrategy?: SetPlanStrategyResolver<Plan, any, Context>;
    setPlanActionRecipe?: SetPlanActionRecipeResolver<PlanAction, any, Context>;
    showMessage?: ShowMessageResolver<Message | null, any, Context>;
    dismissMessage?: DismissMessageResolver<number | null, any, Context>;
    dismissPromotion?: DismissPromotionResolver<string, any, Context>;
    setPreferredServings?: SetPreferredServingsResolver<number, any, Context>;
    setSearchInputValue?: SetSearchInputValueResolver<string, any, Context>;
    addSearchFilter?: AddSearchFilterResolver<SearchFilter, any, Context>;
    removeSearchFilter?: RemoveSearchFilterResolver<
      SearchFilter | null,
      any,
      Context
    >;
    resetSearch?: ResetSearchResolver<number | null, any, Context>;
  }

  export type PingResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UpdateRecipeCoverImageResolver<
    R = Recipe,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateRecipeCoverImageArgs>;
  export interface UpdateRecipeCoverImageArgs {
    id: string;
    input: ImageCreateInput;
  }

  export type CreateIngredientResolver<
    R = Ingredient,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, CreateIngredientArgs>;
  export interface CreateIngredientArgs {
    input: IngredientCreateInput;
  }

  export type UpdateIngredientResolver<
    R = Ingredient,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateIngredientArgs>;
  export interface UpdateIngredientArgs {
    id: string;
    input: IngredientUpdateInput;
  }

  export type DeleteIngredientResolver<
    R = Ingredient | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteIngredientArgs>;
  export interface DeleteIngredientArgs {
    id: string;
  }

  export type MergeIngredientsResolver<
    R = Ingredient | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, MergeIngredientsArgs>;
  export interface MergeIngredientsArgs {
    primary: string;
    secondary: string;
  }

  export type CreateRecipeResolver<
    R = Recipe,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, CreateRecipeArgs>;
  export interface CreateRecipeArgs {
    input: RecipeCreateInput;
  }

  export type LinkRecipeResolver<
    R = Recipe,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, LinkRecipeArgs>;
  export interface LinkRecipeArgs {
    input: RecipeLinkInput;
  }

  export type UpdateRecipeDetailsResolver<
    R = Recipe | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateRecipeDetailsArgs>;
  export interface UpdateRecipeDetailsArgs {
    id: string;
    input: RecipeDetailsUpdateInput;
  }

  export type PublishRecipeResolver<
    R = Recipe | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, PublishRecipeArgs>;
  export interface PublishRecipeArgs {
    id: string;
  }

  export type RecordRecipeViewResolver<
    R = Recipe | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, RecordRecipeViewArgs>;
  export interface RecordRecipeViewArgs {
    id: string;
  }

  export type UpdateRecipeIngredientResolver<
    R = RecipeIngredient,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateRecipeIngredientArgs>;
  export interface UpdateRecipeIngredientArgs {
    id: string;
    input: RecipeIngredientUpdateInput;
  }

  export type ReparseRecipeIngredientResolver<
    R = RecipeIngredient,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ReparseRecipeIngredientArgs>;
  export interface ReparseRecipeIngredientArgs {
    id: string;
    input: RecipeIngredientParseInput;
  }

  export type AddRecipeIngredientResolver<
    R = Recipe,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, AddRecipeIngredientArgs>;
  export interface AddRecipeIngredientArgs {
    recipeId: string;
    input: RecipeIngredientParseInput;
  }

  export type MoveRecipeIngredientResolver<
    R = Recipe,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, MoveRecipeIngredientArgs>;
  export interface MoveRecipeIngredientArgs {
    recipeId: string;
    input: ListMoveInput;
  }

  export type DeleteRecipeIngredientResolver<
    R = Recipe,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteRecipeIngredientArgs>;
  export interface DeleteRecipeIngredientArgs {
    id: string;
  }

  export type UpdateRecipeStepResolver<
    R = RecipeStep,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdateRecipeStepArgs>;
  export interface UpdateRecipeStepArgs {
    id: string;
    input: RecipeStepUpdateInput;
  }

  export type CreateRecipeStepResolver<
    R = Recipe,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, CreateRecipeStepArgs>;
  export interface CreateRecipeStepArgs {
    recipeId: string;
    input: RecipeStepCreateInput;
  }

  export type MoveRecipeStepResolver<
    R = Recipe,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, MoveRecipeStepArgs>;
  export interface MoveRecipeStepArgs {
    recipeId: string;
    input: ListMoveInput;
  }

  export type DeleteRecipeStepResolver<
    R = Recipe,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DeleteRecipeStepArgs>;
  export interface DeleteRecipeStepArgs {
    id: string;
  }

  export type LikeRecipeResolver<
    R = Recipe,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, LikeRecipeArgs>;
  export interface LikeRecipeArgs {
    id: string;
  }

  export type UnlikeRecipeResolver<
    R = Recipe,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UnlikeRecipeArgs>;
  export interface UnlikeRecipeArgs {
    id: string;
  }

  export type MergeUserResolver<
    R = User | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type SetPlanDetailsResolver<
    R = Plan,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SetPlanDetailsArgs>;
  export interface SetPlanDetailsArgs {
    details: PlanSetDetailsInput;
  }

  export type SetPlanMealDetailsResolver<
    R = Plan,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SetPlanMealDetailsArgs>;
  export interface SetPlanMealDetailsArgs {
    dayIndex: number;
    mealIndex: number;
    details: PlanSetMealDetailsInput;
  }

  export type SetPlanStrategyResolver<
    R = Plan,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SetPlanStrategyArgs>;
  export interface SetPlanStrategyArgs {
    strategy?: PlanStrategy | null;
  }

  export type SetPlanActionRecipeResolver<
    R = PlanAction,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SetPlanActionRecipeArgs>;
  export interface SetPlanActionRecipeArgs {
    actionId: string;
    recipeId: string;
  }

  export type ShowMessageResolver<
    R = Message | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ShowMessageArgs>;
  export interface ShowMessageArgs {
    contents: (string | null)[];
  }

  export type DismissMessageResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DismissMessageArgs>;
  export interface DismissMessageArgs {
    id: string;
  }

  export type DismissPromotionResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, DismissPromotionArgs>;
  export interface DismissPromotionArgs {
    id: string;
  }

  export type SetPreferredServingsResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SetPreferredServingsArgs>;
  export interface SetPreferredServingsArgs {
    servings: number;
  }

  export type SetSearchInputValueResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SetSearchInputValueArgs>;
  export interface SetSearchInputValueArgs {
    value: string;
  }

  export type AddSearchFilterResolver<
    R = SearchFilter,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, AddSearchFilterArgs>;
  export interface AddSearchFilterArgs {
    type: string;
    subject?: string | null;
    display?: string | null;
  }

  export type RemoveSearchFilterResolver<
    R = SearchFilter | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, RemoveSearchFilterArgs>;
  export interface RemoveSearchFilterArgs {
    id: string;
  }

  export type ResetSearchResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace PlanActionCookResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    type?: TypeResolver<PlanActionType, any, Context>;
    servings?: ServingsResolver<number, any, Context>;
    mealType?: MealTypeResolver<PlanMealType, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TypeResolver<
    R = PlanActionType,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ServingsResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type MealTypeResolver<
    R = PlanMealType,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace PlanActionEatResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    type?: TypeResolver<PlanActionType, any, Context>;
    leftovers?: LeftoversResolver<boolean, any, Context>;
    cookAction?: CookActionResolver<PlanActionCook, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TypeResolver<
    R = PlanActionType,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type LeftoversResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type CookActionResolver<
    R = PlanActionCook,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace PlanActionEatOutResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    type?: TypeResolver<PlanActionType, any, Context>;
    note?: NoteResolver<string | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TypeResolver<
    R = PlanActionType,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NoteResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace PlanActionReadyMadeResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    type?: TypeResolver<PlanActionType, any, Context>;
    note?: NoteResolver<string | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TypeResolver<
    R = PlanActionType,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NoteResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace PlanActionSkipResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    type?: TypeResolver<PlanActionType, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TypeResolver<
    R = PlanActionType,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace CalendarPlan {
  export type Variables = {
    weekIndex: number;
  };

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
    plan?: Plan | null;
  };

  export type Plan = {
    __typename?: 'Plan';
    id: string;
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

export namespace CalendarDay {
  export type Fragment = {
    __typename?: 'PlanDay';
    id: string;
    date?: Date | null;
    meals: Meals[];
  };

  export type Meals = CalendarMeal.Fragment;
}

export namespace CalendarMeal {
  export type Fragment = {
    __typename?: 'PlanMeal';
    id: string;
    actions: Actions[];
  };

  export type Actions = {
    __typename?:
      | PlanActionCookInlineFragment['__typename']
      | PlanActionEatInlineFragment['__typename'];
    type: PlanActionType;
  } & (PlanActionCookInlineFragment | PlanActionEatInlineFragment);

  export type PlanActionCookInlineFragment = {
    __typename?: 'PlanActionCook';
    servings: number;
    mealType: PlanMealType;
  };

  export type PlanActionEatInlineFragment = {
    __typename?: 'PlanActionEat';
    leftovers: boolean;
    cookAction: CookAction;
  };

  export type CookAction = {
    __typename?: 'PlanActionCook';
    servings: number;
    mealType: PlanMealType;
  };
}
