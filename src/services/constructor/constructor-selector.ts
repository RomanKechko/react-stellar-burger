import { IIngredient, IIngredientAndUniqueId } from "../../types/interface";

export const buns = (state: any) =>
  (state.constructorIngredient?.bun as IIngredientAndUniqueId) || [];
export const stuffing = (state: any) =>
  (state.constructorIngredient?.stuffing as IIngredient[]) || [];
export const bunId = (state: any) =>
  (state.constructorIngredient.bun?._id as string) || [];
export const stuffingId = (state: any) => {
  return state.constructorIngredient.stuffing
    ? state.constructorIngredient.stuffing.map(
        (item: IIngredient) => item?._id as string
      )
    : [];
};
