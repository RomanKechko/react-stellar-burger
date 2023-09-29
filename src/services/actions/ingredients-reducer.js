export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_ERROR = "GET_ITEMS_ERROR";

export function addIngridients(payload) {
  return {
    type: GET_ITEMS_SUCCESS,
    payload,
  };
}
export function ingredientLoading(payload) {
  return {
    type: GET_ITEMS_REQUEST,
    payload,
  };
}
export function downloadError(payload) {
  return {
    type: GET_ITEMS_ERROR,
    payload,
  };
}

export function getIngredients() {
  return function (dispatch) {
    const url = "https://norma.nomoreparties.space/api/ingredients";

    dispatch(ingredientLoading(true));
    fetch(url)
      .then((res) => res.json())
      .then((list) => {
        dispatch(addIngridients(list));
      })
      .catch((error) => {
        dispatch(downloadError(error));
        console.log(error);
      });
  };
}
