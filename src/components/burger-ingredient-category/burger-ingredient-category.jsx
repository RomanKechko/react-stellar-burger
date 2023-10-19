import React from "react";
import styles from "./burger-ingredient-category.module.css";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
function BurgerIngredientCategory({ title, titleId, data, refs }) {
  return (
    <>
      <h2 id={titleId} className="text text_type_main-medium" ref={refs}>
        {title}
      </h2>
      <ul className={styles.cart__ingridient}>
        {data.map((item) => (
          <BurgerIngredient ingredients={item} key={item._id} />
        ))}
      </ul>
    </>
  );
}
BurgerIngredientCategory.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  titleId: PropTypes.string.isRequired,
  refs: PropTypes.func.isRequired,
};

export default BurgerIngredientCategory;
