import { ADD_STUFFING, ADD_BUN } from "../actions/constructor-action";

const initialState = {
  bun: null,
  stuffing: [],
};
export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUFFING: {
      return {
        ...state,
        stuffing: [...state.stuffing, action.payload],
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case "CONSTRUCTOR_DELETE": {
      return {
        ...state,

        stuffing: state.stuffing.filter((_, index) => index !== action.payload),
      };
    }
    case "CONSTRUCTOR_REODER": {
      const stuffing = [...state.stuffing];
      const [movedElement] = stuffing.splice(action.payload.from, 1);
      stuffing.splice(action.payload.to, 0, movedElement);
      /*  const stuffing = [...state.stuffing];
      stuffing.skice(
        action.payload.to,
        0,
        stuffing.slice(action.payload.from, 1)[0]
      ); */
      return {
        ...state,
        stuffing,
      };
    }

    default:
      return state;
  }
};
