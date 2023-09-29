import { combineReducers } from "redux";
import ingredientsReducer from "./redusers/ingredients-reducer";
import constructorReducer from "./redusers/constructor-reducer";
import modalIngridientReducer from "./redusers/modal-ingridient-reducer";
import modalOrderReducer from "./redusers/modal-order-reducer";
import { createStore, applyMiddleware, composeWithDevTools } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  ingredientsReducer,
  constructorReducer,
  modalIngridientReducer,
  modalOrderReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
