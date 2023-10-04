import { combineReducers } from "redux";
import { ingredientsReducer } from "./redusers/ingredients";
import { constructorReducer } from "./redusers/constructor";
import { modalIngridientReducer } from "./redusers/modal-ingridient";
import { modalOrderReducer } from "./redusers/modal-order";

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
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
