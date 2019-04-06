import Source from './Source';

export interface PlanDay {
  id: string;
  date: any;
}

export default class PlanDays extends Source<PlanDay> {
  constructor(ctx, graph) {
    super(ctx, graph, 'PlanDay', ['id']);
  }

  list = (groupId: string) =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
        MATCH (group:Group {id: $groupId})-[:HAS_PLAN_DAY]->(planDay:PlanDay)
        RETURN planDay {${this.dbFields}}
        `,
        {
          groupId,
        },
      );

      return this.hydrateList(result);
    });
}
