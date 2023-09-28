import React, { useEffect } from "react";
import style from "./app.module.css";
import AppHeader from "../App-Header/App-Header";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients";
import BurgerConstructor from "../Burger-Constructor/Burger-Constructor";

function App() {
  const [ingridients, setIngridients] = React.useState();
  const url = "https://norma.nomoreparties.space/api/ingredients";

  return (
    <div className={style.page}>
      <AppHeader />
      {ingridients && (
        <main className={style.main}>
          <BurgerIngredients list={ingridients.data} />

          <BurgerConstructor list={ingridients.data} />
        </main>
      )}
    </div>
  );
}

export default App;
