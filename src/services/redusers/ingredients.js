import { GET_ITEMS_SUCCESS } from "../actions/ingredients-action";
import { GET_ITEMS_REQUEST } from "../actions/ingredients-action";
import { GET_ITEMS_ERROR } from "../actions/ingredients-action";

const initialState = {
  dataIngridients: [],
  dataRequest: false,
  downloadError: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        dataRequest: action.payload,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        dataIngridients: action.payload,
        dataRequest: false,
      };
    }
    case GET_ITEMS_ERROR: {
      return {
        ...state,
        downloadError: true,
        dataRequest: "",
      };
    }
    default: {
      return state;
    }
  }
};
