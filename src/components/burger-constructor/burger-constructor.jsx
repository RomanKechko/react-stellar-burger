import React, { useEffect, useMemo, useState } from "react"; // Убедитесь, что вы импортируете React
import styles from "./burger-constructor.module.css";
import cn from "classnames";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStuffing from "../burger-constructor-stuffing/burger-constructor-stuffing";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { addIngrrdinentConstructor } from "../../services/actions/constructor-action.js";
import { sendOrder } from "../../services/actions/modal-order-action";
import loader from "../../icons/loader.png";

function BurgerConstructor() {
  const [finalPrice, setfinalPrice] = useState(0);
  const [isActive, setActive] = useState(false);
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

  const orderHandler = () => {
    setActive(true);
    dispatch(sendOrder(ingredientsId));
  };

  //перенос ингредиетов
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ADD_CONSTRUCTOR",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
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

  return (
    <section
      ref={dropTarget}
      className={cn(styles.section__constructor, "pt-25 pl-4")}
    >
      <div
        className={styles.container}
        style={{
          outline: isHover ? "4px solid rgb(19, 33, 154)" : "none",
          borderRadius: isHover ? "50px" : "0",
          boxSizing: "border-box",
        }}
      >
        <div className={cn(styles.bun, "pl-8")}>
          <ConstructorElement
            key={bun.uniqueId}
            type="top"
            isLocked={true}
            text={bun.name ? `${bun.name} (низ)` : "Перенесите булочку "}
            price={bun.price}
            thumbnail={bun.image ? `${bun.image}` : loader}
          />
        </div>
        <ul className={styles.stuffing}>
          {list.map((item, index) => (
            <BurgerConstructorStuffing
              ingredients={item}
              index={index}
              key={item.uniqueId}
            />
          ))}
        </ul>
        <div className="pl-8">
          <ConstructorElement
            key={bun.uniqueId}
            type="bottom"
            isLocked={true}
            text={bun.name ? `${bun.name} (низ)` : "Перенесите булочку "}
            price={bun.price}
            thumbnail={bun.image ? `${bun.image}` : loader}
          />
        </div>
      </div>
      <div className={cn(styles.container__order, "pt-10")}>
        <div className={styles.container__order_price}>
          <p className="text text_type_digits-default mr-2">{finalPrice}</p>
          <span className={styles.icon}>
            <CurrencyIcon type="primary" />
          </span>
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={orderHandler}
          disabled={(!bun || bun.length === 0) && (!list || list.length === 0)}
        >
          Оформить заказ
        </Button>
      </div>
      {loading && <span className={styles.loader}></span>}
      {number && (
        <Modal setActive={setActive}>
          <OrderDetails number={number} isActive={isActive} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;