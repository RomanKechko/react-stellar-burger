import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import Done from "../../icons/done.svg";
import PropTypes from "prop-types";
import { resetConstructor } from "../../services/constructor/constructor-slice";
import { closeModal } from "../../services/modal-order/modal-order-slice.js";

interface OrderDetailsProps {
  number: number;
  isActive: boolean;
}

const OrderDetails: FC<OrderDetailsProps> = ({ number, isActive }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(closeModal());
      dispatch(resetConstructor());
    };
  }, [isActive]);

  return (
    <div>
      <div className="text text_type_digits-large pt-30">{number}</div>
      <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
      <img src={Done} alt="Готово" className="pt-15" />
      <p className="text text_type_main-small pt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive pt-2 pb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
