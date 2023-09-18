import React, { useEffect } from "react";
import style from "./App.module.css";
import AppHeader from "../App-Header/App-Header";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients";
import BurgerConstructor from "../Burger-Constructor/Burger-Constructor";

function App() {
  const [ingridients, setIngridients] = React.useState();
  const url = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((list) => {
        setIngridients(list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
