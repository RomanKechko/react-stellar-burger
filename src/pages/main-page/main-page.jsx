import React, { useEffect } from "react";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { getIngredients } from "../../services/actions/ingredients-action";
import { useSelector, useDispatch } from "react-redux";
import style from "../../components/app/app.module.css";

const MainPage = () => {
  const isLoading = useSelector(
    (state) => state.ingredientsReducer.dataRequest
  );
  const error = useSelector((state) => state.ingredientsReducer.downloadError);
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
