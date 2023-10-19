import React from "react";
import cn from "classnames";
import styles from "./ingredient-details.module.css";

import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

function IngredientDetails() {
  const list =
    useSelector((state) => state.ingredientsReducer.dataIngridients?.data) ||
    [];

  const { id } = useParams();

  const ingredient = list.find((item) => item._id === id) || {};
  console.log(list);
  return (
    list && (
      <div className={styles.container}>
        <span className={cn(styles.modal__title, "pt-10 pr-10 pl-10")}>
          <h2 className={"text text_type_main-large pt-3"}>
            Детали ингридиента
          </h2>
        </span>
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={styles.container__ingridient_image}
        />
        <p className="text text_type_main-medium pt-4 ">{ingredient.name}</p>
        <ul className={cn(styles.container__list_energy, "pt-8")}>
          <li className={styles.item__energy}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <span className="text text_type_digits-default text_color_inactive">
              {ingredient.calories}
            </span>
          </li>
          <li className={styles.item__energy}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <span className="text text_type_digits-default text_color_inactive">
              {ingredient.proteins}
            </span>
          </li>
          <li className={styles.item__energy}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <span className="text text_type_digits-default text_color_inactive">
              {ingredient.fat}
            </span>
          </li>
          <li className={styles.item__energy}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <span className="text text_type_digits-default text_color_inactive">
              {ingredient.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    )
  );
}

export default IngredientDetails;
