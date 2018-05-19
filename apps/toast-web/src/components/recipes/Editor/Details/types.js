export type RecipeEditorFormState = {
  loading: boolean,
  saving: boolean,
  isTitleEnabled: boolean,
  isDescriptionEnabled: boolean,
  title: string,
  description: string,
  onFieldChange(fieldName: string, value: string): void,
  onFieldBlur(fieldName: string): Promise<void>,
};
