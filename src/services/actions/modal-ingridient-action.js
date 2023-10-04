export const OPEN_MODAL = "OPEN_MODAL";

export const openModal = (payload) => {
  return {
    type: OPEN_MODAL,
    payload,
  };
};

export function modalIngridient(modalData) {
  return function (dispatch) {
    dispatch(openModal(modalData));
  };
}
