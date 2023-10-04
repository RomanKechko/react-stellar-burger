import React, { useEffect } from "react";
import style from "./app.module.css";
import AppHeader from "../App-Header/App-Header";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients";
import BurgerConstructor from "../Burger-Constructor/Burger-Constructor";
import { getIngredients } from "../../services/actions/ingredients-action";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const isLoading = useSelector(
    (state) => state.ingredientsReducer.dataRequest
  );
  const error = useSelector((state) => state.ingredientsReducer.downloadError);
  return (
    <div className={style.page}>
      <AppHeader />

      {isLoading && <h2 className={style.services}>Loading...</h2>}
      {!isLoading && error && (
        <h2 className={style.services}>Ошибка при загрузке данных</h2>
      )}
      {!isLoading && !error && (
        <main className={style.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      )}
    </div>
  );
}

export default App;
