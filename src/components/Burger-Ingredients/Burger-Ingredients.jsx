import React, { useState, useEffect } from "react";
import style from "./Burger-Ingredients.module.css";
import cn from "classnames";
import Tabs from "../Tabs/Tabs";
import BurgerIngredientCategory from "../Burger-Ingredient-Category/Burger-Ingredient-Category";
import IngredientDetails from "../Ingredient-Details/Ingredient-Details";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import styles from "../Burger-Ingredient-Category/Burger-Ingredient-Category.module.css";
import { useInView } from "react-intersection-observer";
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
  const sauces = list.filter((item) => item.type === "sauce");

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });
  const [mainRef, inViewFilling] = useInView({
    threshold: 0,
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab("buns");
    } else if (inViewSauces) {
      setCurrentTab("sauces");
    } else if (inViewFilling) {
      setCurrentTab("mains");
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

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
        <div className={styles.cart__ingridient} ref={bunsRef}>
          {bun.map((item) => (
            <BurgerIngredientCategory data={item} />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" id="mains">
          Начинка
        </h2>
        <div className={styles.cart__ingridient} ref={mainRef}>
          {main.map((item) => (
            <BurgerIngredientCategory data={item} />
          ))}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" id="sauces">
          Соусы
        </h2>
        <div className={styles.cart__ingridient} ref={saucesRef}>
          {sauces.map((item) => (
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
