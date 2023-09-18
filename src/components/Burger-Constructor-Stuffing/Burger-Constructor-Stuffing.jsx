import React from "react";
import cn from "classnames";
import styles from "../Burger-Constructor/Burger-Constructor.module.css";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructorStuffing({ ingredients }) {
  const packetOfStuffing = ingredients.filter((item) => item.type !== "bun");
  const stuffing = packetOfStuffing.map((item) => (
    <li key={item._id} className={cn(styles.single__fill, "pr-2")}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  ));

  return <ul className={styles.stuffing}>{stuffing}</ul>;
}
BurgerConstructorStuffing.propTypes = {
  ingredients: PropTypes.array.isRequired,
};
export default BurgerConstructorStuffing;
