import React, { useEffect } from "react";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useSelector, useDispatch } from "react-redux";
import style from "../../components/app/app.module.css";
import {
  ingredientRequest,
  ingredientRequestError,
} from "../../services/ingredints/ingredients-selector";

const MainPage = () => {
  const isLoading = useSelector(ingredientRequest);
  const error = useSelector(ingredientRequestError);
  return (
    <>
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
    </>
  );
};

export default MainPage;
