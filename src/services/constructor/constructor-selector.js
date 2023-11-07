export const buns = (state) => state.constructorIngredient?.bun || [];
export const stuffing = (state) => state.constructorIngredient?.stuffing || [];
export const bunId = (state) => state.constructorIngredient.bun?._id || [];
export const stuffingId = (state) => {
  console.log(state);
  return state.constructorIngredient.stuffing
    ? state.constructorIngredient.stuffing.map((item) => item?._id)
    : [];
};
