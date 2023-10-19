import React, { useEffect, useMemo, useState } from "react";
import style from "./burger-ingredients.module.css";
import cn from "classnames";
import Tabs from "../tabs/tabs";
import BurgerIngredientCategory from "../burger-ingredient-category/burger-ingredient-category";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

function BurgerIngredients() {
  const [currentTab, setCurrentTab] = React.useState("buns");
  const [isActive, setActive] = useState(null);

  const list =
    useSelector((state) => state.ingredientsReducer.dataIngridients?.data) ||
    [];

  const buns = useMemo(
    () => list.filter((item) => item.type === "bun"),
    [list]
  );
  const mains = useMemo(
    () => list.filter((item) => item.type === "main"),
    [list]
  );
  const sauces = useMemo(
    () => list.filter((item) => item.type === "sauce"),
    [list]
  );

  const ingredient = useSelector(
    (state) => state.modalIngridientReducer.ingredient
  );

  const onClickTab = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  /* console.log(bun); */

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });
  const [mainsRef, inViewFilling] = useInView({
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
      <div className={cn(style.container, "pt-10")}>
        <BurgerIngredientCategory
          title="Булки"
          titleId="buns"
          data={buns}
          refs={bunsRef}
          setActive={setActive}
        />
        <BurgerIngredientCategory
          title="Начинка"
          titleId="mains"
          data={mains}
          refs={mainsRef}
          setActive={setActive}
        />
        <BurgerIngredientCategory
          title="Соусы"
          titleId="sauces"
          data={sauces}
          refs={saucesRef}
          setActive={setActive}
        />
      </div>
    </section>
  );
}

export default BurgerIngredients;