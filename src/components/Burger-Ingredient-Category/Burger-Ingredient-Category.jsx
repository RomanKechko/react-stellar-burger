import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";
import styles from "./Burger-Ingredient-Category.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { modalIngridient } from "../../services/actions/modal-ingridient";

function BurgerIngredientCategory({ data, title, titleId }) {
  const dispatch = useDispatch();

  function modal(item) {
    dispatch(modalIngridient(item));
  }
  return (
    <>
      <h2 className="text text_type_main-medium" id={titleId}>
        {title}
      </h2>
      <ul className={styles.cart__ingridient}>
        {data.map((item) => (
          <li
            key={item._id}
            className={cn(styles.cart__ingridient_block, "mt-6  ml-4")}
          >
            <button
              className={styles.button__ingridients}
              onClick={() => modal(item)}
            >
              <img
                src={item.image}
                alt="булочка"
                className={cn(styles.image__bun, "ml-4 mr-4")}
              />
              <Counter
                count={1}
                size="default"
                extraClass="m-1"
                className={styles.amount__of_additives}
              />
              <div className={cn(styles.container__price, "mt-1")}>
                <p
                  className={cn(
                    styles.text__color,
                    "text text_type_digits-default"
                  )}
                >
                  {item.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>

              <p
                className={cn(
                  styles.description,
                  "text text_type_main-small pt-1"
                )}
              >
                {item.name}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
/* BurgerIngredientCategory.propTypes = {
  data: PropTypes.array.isRequired,
  ingridientshandle: PropTypes.func,
  title: PropTypes.string.isRequired,
  titleId: PropTypes.string.isRequired,
}; */

export default BurgerIngredientCategory;
