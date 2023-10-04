import React, { useState } from "react";
import style from "./Burger-Ingredients.module.css";
import cn from "classnames";
import Tabs from "../Tabs/Tabs";
import BurgerIngredientCategory from "../Burger-Ingredient-Category/Burger-Ingredient-Category";
import IngredientDetails from "../Ingredient-Details/Ingredient-Details";
import Modal from "../Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import styles from "../Burger-Ingredient-Category/Burger-Ingredient-Category.module.css";
function BurgerIngredients() {
  const [currentTab, setCurrentTab] = React.useState("buns");

  const list =
    useSelector((state) => state.ingredientsReducer.dataIngridients?.data) ||
    [];
  const ingredient = useSelector(
    (state) => state.modalIngridientReducer.ingredient
  );

  const onClickTab = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const bun = list.filter((item) => item.type === "bun");
  const main = list.filter((item) => item.type === "main");
  const sauce = list.filter((item) => item.type === "sauce");

  return (
    <section className={cn(style.section, "pt-10")}>
      <h1 className={cn(style.title, "text text_type_main-large")}>
        Соберите бургер
      </h1>
      <Tabs currentTab={currentTab} onClickTab={onClickTab} />
      <div className={cn(style.container)}>
        <h2 className="text text_type_main-medium mt-10 mb-6" id="buns">
          Булки
        </h2>
        <div className={styles.cart__ingridient}>
          {bun.map((item) => (
            <BurgerIngredientCategory data={item} />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" id="mains">
          Начинка
        </h2>
        <div className={styles.cart__ingridient}>
          {main.map((item) => (
            <BurgerIngredientCategory data={item} />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" id="sauces">
          Соусы
        </h2>
        <div className={styles.cart__ingridient}>
          {sauce.map((item) => (
            <BurgerIngredientCategory data={item} />
          ))}
        </div>
      </div>
      {ingredient && (
        <Modal>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
