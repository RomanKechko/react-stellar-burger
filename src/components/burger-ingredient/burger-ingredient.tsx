import React, { useRef, useMemo, FC } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  bunId,
  stuffingId,
} from "../../services/constructor/constructor-selector";
import { IIngredient } from "../../types/interface";

interface IBurgerIngredientProps {
  ingredients: IIngredient;
}

const BurgerIngredient: FC<IBurgerIngredientProps> = ({ ingredients }) => {
  const quantityBun = useSelector(bunId);
  const quantityStuffing = useSelector(stuffingId);
  const ref = useRef<HTMLLIElement>(null);

  const quantity = useMemo(() => {
    let count = 0;
    if (ingredients && ingredients._id) {
      if (quantityBun === ingredients._id) {
        count += 2;
      }
      const matchingIds = quantityStuffing.filter(
        (id: string) => id === ingredients._id
      );
      count += matchingIds.length;
    }
    return count;
  }, [ingredients, quantityBun, quantityStuffing]);

  const [, drag] = useDrag<IIngredient, unknown, unknown>({
    type: "ADD_CONSTRUCTOR",
    item: ingredients,
  });
  drag(ref);

  const location = useLocation();

  return (
    <li ref={ref} className={cn(styles.cart__ingridient_block, "mt-6  ml-4")}>
      <Link
        to={`/ingredients/${ingredients._id}`}
        state={{ backgroundLocation: location }}
        replace
        className={styles.cart__ingridient_link}
      >
        <img
          src={ingredients.image}
          alt="булочка"
          className={cn(styles.image__bun, "ml-4 mr-4")}
        />
        <Counter count={quantity} size="default" extraClass="m-1" />
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
      </Link>
    </li>
  );
};

export default BurgerIngredient;
