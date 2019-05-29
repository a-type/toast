export const returnRecipeIfUserHasAccess = (
  recipeBoundName: string = 'recipe',
) => `
OPTIONAL MATCH (author:User)-[:AUTHOR_OF]->(${recipeBoundName})
OPTIONAL MATCH (currentUser:User)-[:MEMBER_OF]->(:Group)-[:COLLECTED_RECIPE]->(${recipeBoundName})
RETURN CASE
  WHEN author.id = $cypherParams.userId OR (NOT coalesce(${recipeBoundName}.private, false) AND ${recipeBoundName}.published)
    THEN recipe
  WHEN currentUser IS NOT NULL
    THEN recipe
  ELSE NULL
END
`;
