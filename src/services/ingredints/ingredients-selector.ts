import { IIngredient } from "../../types/interface";

export const ingredientRequest = (state: any) =>
  state.ingredients.dataRequest as boolean;
export const successfulResponse = (state: any) =>
  (state.ingredients.dataIngridients?.data as IIngredient[]) || [];
export const ingredientRequestError = (state: any) =>
  state.ingredients.downloadError as boolean;
