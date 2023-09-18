import React, { useState } from "react";
import style from "./Burger-Ingredients.module.css";
import cn from "classnames";
import Tabs from "../Tabs/Tabs";
import BurgerIngredientCategory from "../Burger-Ingredient-Category/Burger-Ingredient-Category";
import IngredientDetails from "../Ingredient-Details/Ingredient-Details";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";

function BurgerIngredients({ list }) {
  const [ingredientModal, setIngredientModal] = useState(null);
  const [currentTab, setCurrentTab] = React.useState("buns");

  const handleCloseModalIngredient = () => {
    setIngredientModal(null);
  };

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
      <div className={cn(style.container, "pt-10")}>
        <BurgerIngredientCategory
          data={bun}
          ingridientshandle={setIngredientModal}
          title="Булки"
          titleId="buns"
        />
        <BurgerIngredientCategory
          data={main}
          ingridientshandle={setIngredientModal}
          title="Начинка"
          titleId="mains"
        />
        <BurgerIngredientCategory
          data={sauce}
          ingridientshandle={setIngredientModal}
          title="Соусы"
          titleId="sauces"
        />
      </div>
      {ingredientModal && (
        <Modal onClose={handleCloseModalIngredient}>
          <IngredientDetails ingridients={ingredientModal} />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  list: PropTypes.array.isRequired,
};

export default BurgerIngredients;
