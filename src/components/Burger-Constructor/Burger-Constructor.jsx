import React, { useEffect, useMemo, useState } from "react"; // Убедитесь, что вы импортируете React
import styles from "./Burger-Constructor.module.css";
import cn from "classnames";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStuffing from "../Burger-Constructor-Stuffing/Burger-Constructor-Stuffing";
import Modal from "../Modal/Modal";
import OrderDetails from "../Order-Details/Order-Details";

import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { addIngrrdinentConstructor } from "../../services/actions/constructor-action.js";
import { setData } from "../../services/actions/modal-order-action";

function BurgerConstructor() {
  const [finalPrice, setfinalPrice] = useState(0);
  const dispatch = useDispatch();

  // state конструктора
  const bun = useSelector((state) => state.constructorReducer?.bun) || [];
  const list = useSelector((state) => state.constructorReducer?.stuffing) || [];
  // state конструктора

  //загрузка при оформлении заказа
  const number =
    useSelector((state) => state.modalOrderReducer.status?.order.number) ||
    null;
  const loading = useSelector((state) => state.modalOrderReducer.loading);
  //загрузка при оформлении заказа

  //счет
  let ingredientsId = [];
  if ((bun && bun._id) || (list && list.length > 0)) {
    ingredientsId = list.map((item) => item._id).concat(bun._id, bun._id);
  }
  //счет

  //перенос ингредиетов
  const [, dropTarget] = useDrop({
    accept: "ADD_CONSTRUCTOR",
    drop: (data) => {
      dispatch(addIngrrdinentConstructor(data));
    },
  });
  //перенос ингредиетов

  //счет
  const account = useMemo(() => {
    const priceBun = bun.length !== 0 ? bun.price * 2 : 0;
    const priceList =
      list.lenght !== 0
        ? list.reduce((accumulator, ingredient) => {
            return accumulator + ingredient.price;
          }, 0)
        : 0;
    return priceBun + priceList;
  }, [bun, list]);

  useEffect(() => {
    setfinalPrice(account);
  }, [account]);
  //счет

  const text = "Перетяните булочку сюда";

  return (
    <section
      ref={dropTarget}
      className={cn(styles.section__constructor, "pt-25 pl-4")}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          height: "656px",
        }}
      >
        <div className="pl-8" key={bun._id} style={{ width: "536px" }}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <ul className={styles.stuffing}>
          {list.map((item, index) => (
            <BurgerConstructorStuffing ingredients={item} index={index} />
          ))}
        </ul>
        <div className="pl-8" key={"2"}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun !== null ? bun.name + " (низ)" : text}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div className={cn(styles.container__order, "pt-10")}>
        <div className={styles.container__order_price}>
          <p className="text text_type_digits-default mr-2">{finalPrice}</p>
          <span className={styles.icon}>
            <CurrencyIcon
              type="primary"
              style={{ width: "36px", height: "36px" }}
            />
          </span>
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => dispatch(setData(ingredientsId))}
        >
          Оформить заказ
        </Button>
      </div>
      {loading && <span class={styles.loader}></span>}
      {number && (
        <Modal>
          <OrderDetails number={number} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
