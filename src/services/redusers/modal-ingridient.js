import { OPEN_MODAL } from "../actions/modal-ingridient";
import { CLOSE_MODAL } from "../actions/close-modal";

const initialState = {
  ingredient: null,
};
console.log(initialState);
export const modalIngridientReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        ingredient: action.payload,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        ingredient: action.payload,
      };
    }
    default:
      return state;
  }
};
