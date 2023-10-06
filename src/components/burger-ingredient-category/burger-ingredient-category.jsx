import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import styles from "./burger-ingredient-category.module.css";
import PropTypes from "prop-types";
import { modalIngridient } from "../../services/actions/modal-ingridient-action";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
function BurgerIngredientCategory({ title, titleId, data, refs }) {
  const dispatch = useDispatch();

  function modal(item) {
    dispatch(modalIngridient(item));
  }

  return (
    <>
      <h2 id={titleId} className="text text_type_main-medium" ref={refs}>
        {title}
      </h2>
      <ul className={styles.cart__ingridient}>
        {data.map((item) => (
          <BurgerIngredient ingredients={item} modal={modal} key={item._id} />
        ))}
      </ul>
    </>
  );
}
BurgerIngredientCategory.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BurgerIngredientCategory;
