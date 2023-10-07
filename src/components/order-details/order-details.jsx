import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Done from "../../icons/done.svg";
import PropTypes from "prop-types";
import { modalOrderOnClose } from "../../services/actions/modal-order-action";
import { resetConstructor } from "../../services/actions/constructor-action";

function OrderDetails({ number, isActive }) {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(modalOrderOnClose());
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
}
OrderDetails.propTypes = {
  orderNumber: PropTypes.number,
};
export default OrderDetails;
