/* import checkResponse from "../../utils/chek-response";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
const BASE_URL = "https://norma.nomoreparties.space/api/auth";

export const registration = (userData) => {
  return {
    type: REGISTRATION_REQUEST,
    payload: userData,
  };
};

export const registrationQuery = (name, email, password) => {
  return (dispatch, getState) => {
    fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then(checkResponse)
      .then((res) => {
        dispatch(registration(res));
      })
      .catch((err) => console.error("Error fetching data: ", err));
  };
};
 */
