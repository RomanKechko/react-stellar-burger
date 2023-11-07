export const ingredientRequest = (state) => state.ingredients.dataRequest;
export const successfulResponse = (state) =>
  state.ingredients.dataIngridients?.data || [];
export const ingredientRequestError = (state) =>
  state.ingredients.downloadError;
