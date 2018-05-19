import { getForRecipe } from './service';

export const typeDefs = `
type RecipeStep {
  id: ID!
  index: Int!
  step: Step! @cypher(
    statement: "MATCH ()<-[this]-(s:Step) return s { .text, .id }"
  )
}

extend type Recipe {
  steps: [RecipeStep!]!
}
`;

export const resolvers = {
  Recipe: {
    steps: (parent, args, ctx, info) => {
      const steps = getForRecipe(parent.id, ctx);
      return steps;
    }
  }
};
