export const ADD_STUFFING = "ADD_STUFFING";
export const ADD_BUN = "ADD_BUN";

export const addstuffing = (payload) => {
  return {
    type: ADD_STUFFING,
    payload,
  };
};
export const addbun = (payload) => {
  return {
    type: ADD_BUN,
    payload,
  };
};

export function addIngrrdinentConstructor(ingredient) {
  return function (dispatch) {
    if (ingredient.type === "bun") {
      dispatch(addbun(ingredient));
    } else {
      dispatch(addstuffing(ingredient));
    }
  };
}
