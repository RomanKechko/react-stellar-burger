export const CLOSE_MODAL = "CLOSE_MODAL";

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
    payload: null,
  };
};

export function modalIngridientOnClose() {
  return function (dispatch) {
    dispatch(closeModal());
  };
}
