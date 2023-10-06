import { v4 as uuidv4 } from "uuid";

export const ADD_STUFFING = "ADD_STUFFING";
export const ADD_BUN = "ADD_BUN";
export const CONSTRUCTOR_DELETE = "CONSTRUCTOR_DELETE";
export const CONSTRUCTOR_REODER = "CONSTRUCTOR_REODER";

export const addStuffing = (item) => {
  return {
    type: ADD_STUFFING,
    payload: {
      ...item,
      uniqueId: uuidv4(),
    },
  };
};
export const addbun = (item) => {
  return {
    type: ADD_BUN,
    payload: {
      ...item,
      uniqueId: uuidv4(),
    },
  };
};
export const deleteIngredient = (payload) => {
  return {
    type: CONSTRUCTOR_DELETE,
    payload,
  };
};
export const reorderIngredient = (payload) => {
  return {
    type: CONSTRUCTOR_REODER,
    payload,
  };
};

export function addIngrrdinentConstructor(ingredient) {
  return function (dispatch) {
    if (ingredient.type === "bun") {
      dispatch(addbun(ingredient));
    } else {
      dispatch(addStuffing(ingredient));
    }
  };
}
