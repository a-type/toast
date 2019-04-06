import Source from './Source';

export interface Image {
  id: string;
  unit: string;
  unitTextMatch: string;
  value: number;
  valueTextMatch: string;
  ingredientTextMatch: string;
  text: string;
}

export default class Images extends Source<Image> {
  constructor(ctx, graph) {
    super(ctx, graph, 'Image', ['id', 'url', 'attribution']);
  }
}
