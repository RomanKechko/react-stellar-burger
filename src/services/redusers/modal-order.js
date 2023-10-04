import { SEND_DATA } from "../actions/modal-order-action";
import { CLOSE_MODAL } from "../actions/close-modal-action";
import { LOADING } from "../actions/modal-order-action";

const initialState = {
  status: null,
  loading: false,
};
export const modalOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SEND_DATA: {
      return {
        ...state,
        status: action.payload,
        loading: false,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        status: action.payload,
      };
    }
    default:
      return state;
  }
};
