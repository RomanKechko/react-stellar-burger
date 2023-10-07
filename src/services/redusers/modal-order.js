import {
  SEND_DATA,
  LOADING,
  CLOSE_MODAL_ORDER,
  STOP_LOADING,
} from "../actions/modal-order-action";

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
    case CLOSE_MODAL_ORDER: {
      return {
        ...state,
        status: null,
      };
    }
    case STOP_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};
