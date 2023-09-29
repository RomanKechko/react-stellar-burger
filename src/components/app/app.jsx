import React, { useEffect } from "react";
import style from "./app.module.css";
import AppHeader from "../App-Header/App-Header";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients";
import BurgerConstructor from "../Burger-Constructor/Burger-Constructor";
import { Provider } from "react-redux";

import { store } from "../../services/store";

function App() {


  return (
    <div className={style.page}>
      <AppHeader />
      <Provider store={store}>
       
          <main className={style.main}>
            <BurgerIngredients  />
            <BurgerConstructor  />
          </main>
      
      </Provider>
    </div>
  );
}

export default App;
