/* import { setAccessToken } from "./token";
import checkResponse from "./chek-response";

const BASE_URL = "https://norma.nomoreparties.space/api/auth";
export const register = ({ name, password, email }) => {
  return fetch("https://norma.nomoreparties.space/api/auth/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password, email }),
  }).then((response) => {
    console.log(response);
    return response.json();
  });
};

export const authorize = ({ email, password }) => {
  return fetch("https://norma.nomoreparties.space/api/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        return data;
      } else {
        return null;
      }
    });
};

export const getContent = (token) => {
  return fetch("https://norma.nomoreparties.space/api/auth/user", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
 */
