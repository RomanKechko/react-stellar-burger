import { useEffect } from "react";
import { getAccessToken } from "./token";

export const url: string = "https://norma.nomoreparties.space/api";

const token = getAccessToken();
const tokenWithoutBearer = token ? token.replace(/^Bearer\s/, "") : null;
export const urlFeed: string = "wss://norma.nomoreparties.space/orders/all";
export const urlOrders: string = `wss://norma.nomoreparties.space/orders?token=${tokenWithoutBearer}`;

export default function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    console.error("Error in response:", res.status, res.statusText);
    return res.json().then((err: any) => Promise.reject(err));
  }
}
