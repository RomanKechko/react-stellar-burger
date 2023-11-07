import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredints/ingredients-slice";
import constructorSlice from "./constructor/constructor-slice";
import modalOrderSlice from "./modal-order/modal-order-slice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    constructorIngredient: constructorSlice,
    modalOrder: modalOrderSlice,
  },
});
