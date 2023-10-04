import React, { useRef, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import styles from "./Burger-Ingredient-Category.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { modalIngridient } from "../../services/actions/modal-ingridient-action";
import { useDrag } from "react-dnd";

function BurgerIngredientCategory({ data }) {
  const dispatch = useDispatch();
  /*  const bun = useSelector((state) => state.constructorReducer?.bun) || [];
  const list = useSelector((state) => state.constructorReducer?.stuffing) || []; */
  console.log(data);
  const ref = useRef();
  const [, drag] = useDrag({
    type: "ADD_CONSTRUCTOR",
    item: data,
  });
  drag(ref);

  function modal(item) {
    dispatch(modalIngridient(item));
  }
  console.log(data._id);
  return (
    <article
      ref={ref}
      key={data._id}
      className={cn(styles.cart__ingridient_block, "mt-6  ml-4")}
    >
      <button
        className={styles.button__ingridients}
        onClick={() => modal(data)}
      >
        <img
          src={data.image}
          alt="булочка"
          className={cn(styles.image__bun, "ml-4 mr-4")}
        />
        <Counter
          count={0}
          size="default"
          extraClass="m-1"
          className={styles.amount__of_additives}
        />
        <div className={cn(styles.container__price, "mt-1")}>
          <p
            className={cn(styles.text__color, "text text_type_digits-default")}
          >
            {data.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>

        <p className={cn(styles.description, "text text_type_main-small pt-1")}>
          {data.name}
        </p>
      </button>
    </article>
  );
}
BurgerIngredientCategory.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BurgerIngredientCategory;
