import React, { useEffect } from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../services/actions/ingredients-action";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

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
