import React from "react"; // Убедитесь, что вы импортируете React
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
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function BurgerConstructor() {
  const [stateModalOrder, setStateModalOrder] = React.useState(false);

  const list = useSelector((state) => state.constructorReducer?.data) || [];
  console.log(list);

  const itemBun = list.filter((item) => item.name === "Краторная булка N-200i");
  const bun = itemBun.find((item) => item);
  const orderNumber = Math.floor(Math.random() * 200000);
  return (
    <section className={cn(styles.section__constructor, "pt-25 pl-4")}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          height: "656px",
        }}
      >
        {/*       <div className="pl-8" key={bun}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <BurgerConstructorStuffing ingredients={list} />
        <div className="pl-8" key={bun._id}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div> */}
      </div>
      <div className={cn(styles.container__order, "pt-10")}>
        <div className={styles.container__order_price}>
          <p className="text text_type_digits-default mr-2">333</p>
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
          onClick={() => setStateModalOrder(true)}
        >
          Оформить заказ
        </Button>
      </div>
      {stateModalOrder && (
        <Modal onClose={() => setStateModalOrder(false)}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
}
/*
BurgerConstructor.propTypes = {
  list: PropTypes.array.isRequired,
} */

export default BurgerConstructor;
