import React, { useRef, useMemo } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredient({ ingredients, modal }) {
  const quantityBun =
    useSelector((state) => state.constructorReducer.bun?._id) || [];
  const quantityStuffing =
    useSelector((state) =>
      state.constructorReducer.stuffing.map((item) => item?._id)
    ) || [];

  const quantity = useMemo(() => {
    let count = 0;
    if (ingredients && ingredients._id) {
      if (quantityBun === ingredients._id) {
        count += 2;
      }
      const matchingIds = quantityStuffing.filter(
        (id) => id === ingredients._id
      );
      count += matchingIds.length;
    }
    return count;
  }, [ingredients, quantityBun, quantityStuffing]);

  const ref = useRef();

  const [, drag] = useDrag({
    type: "ADD_CONSTRUCTOR",
    item: ingredients,
  });
  drag(ref);

  return (
    <li ref={ref} className={cn(styles.cart__ingridient_block, "mt-6  ml-4")}>
      <button className={styles.button__ingridients}>
        <img
          src={ingredients.image}
          alt="булочка"
          className={cn(styles.image__bun, "ml-4 mr-4")}
          onClick={() => modal(ingredients)}
        />
        <Counter
          count={quantity}
          size="default"
          extraClass="m-1"
          className={styles.amount__of_additives}
        />
        <div className={cn(styles.container__price, "mt-1")}>
          <p
            className={cn(styles.text__color, "text text_type_digits-default")}
          >
            {ingredients.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>

        <p className={cn(styles.description, "text text_type_main-small pt-1")}>
          {ingredients.name}
        </p>
      </button>
    </li>
  );
}

BurgerIngredient.propTypes = {
  ingredients: PropTypes.object.isRequired,
  modal: PropTypes.func,
};
export default BurgerIngredient;
