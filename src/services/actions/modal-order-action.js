import { BASE_URL } from "./ingredients-action";
import checkResponse from "../../utils/chek-response";
export const SEND_DATA = "SEND_DATA";
export const LOADING = "LOADING";

export const getBack = (payload) => {
  return {
    type: SEND_DATA,
    payload,
  };
};

export const loading = () => {
  return {
    type: LOADING,
    payload: true,
  };
};
export function setData(data) {
  return function (dispatch) {
    const url = `${BASE_URL}/orders`;

    dispatch(loading());
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ingredients: data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkResponse)
      .then((res) => dispatch(getBack(res)))
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  };
}
