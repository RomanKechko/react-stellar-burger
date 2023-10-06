import React, { useRef } from "react";
import cn from "classnames";
import styles from "../burger-constructor/burger-constructor.module.css";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { deleteIngredient } from "../../services/actions/constructor-action";
import { reorderIngredient } from "../../services/actions/constructor-action";

function BurgerConstructorStuffing({ ingredients, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  /* console.log(ingredients); */

  //перенос ингредиентов в конструкторе
  const [{ handlerId }, drop] = useDrop({
    accept: "STUFFING_INGREDIENT",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      dispatch(
        reorderIngredient({
          to: dragIndex,
          from: hoverIndex,
        })
      );
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "STUFFING_INGREDIENT",
    item: () => {
      return { ingredients, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  //перенос ингредиентов в конструкторе

  const opacity = isDragging ? 0.8 : 1;

  drag(drop(ref));

  return (
    <li
      data-handler-id={handlerId}
      ref={ref}
      style={{ opacity }}
      className={cn(styles.single__fill, "pr-2")}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredients.name}
        price={ingredients.price}
        thumbnail={ingredients.image}
        handleClose={() => dispatch(deleteIngredient(index))}
      />
    </li>
  );
}
BurgerConstructorStuffing.propTypes = {
  ingredients: PropTypes.object.isRequired,
};
export default BurgerConstructorStuffing;
