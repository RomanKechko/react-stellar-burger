import { OPEN_MODAL } from "../actions/modal-ingridient-action";
import { CLOSE_MODAL } from "../actions/close-modal-action";

const initialState = {
  ingredient: null,
};

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
