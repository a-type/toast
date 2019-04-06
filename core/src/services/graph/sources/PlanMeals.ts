import Source from './Source';

export interface PlanMeal {
  id: string;
}

export default class PlanMeals extends Source<PlanMeal> {
  constructor(ctx, graph) {
    super(ctx, graph, 'PlanMeal', ['id']);
  }

  belongsToUser = (planMealId: string, userId: string) =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
        MATCH (:User{id:$userId})-[:MEMBER_OF]->(:Group)-[:HAS_PLAN_DAY]->(:PlanDay)-[:HAS_PLAN_MEAL]->(planMeal:PlanMeal{id:$planMealId})
        RETURN planMeal
        `,
        {
          planMealId,
          userId,
        },
      );

      return result.records.length !== 0;
    });
}
