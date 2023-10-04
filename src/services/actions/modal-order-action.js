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
    dispatch(loading());
    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      body: JSON.stringify({
        ingredients: data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => dispatch(getBack(res)))
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  };
}
