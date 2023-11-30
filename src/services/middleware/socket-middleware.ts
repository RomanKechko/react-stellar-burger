import type { Middleware, MiddlewareAPI } from "redux";

import type { AppDispatch, RootState } from "../store";
import { IAction } from "../action/actions";

type TWSActions = {
  wsInit: string;
  /*  wsSendMessage: string; */
  wsSuccess: string;
  wsClose: string;
  wsError: string;
  wsMessage: string;
};

export const socketMiddleware = (wsAction: TWSActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: IAction) => {
      const { dispatch } = store;

      if (action.type === wsAction.wsInit) {
        // объект класса WebSocket
        socket = new WebSocket(action.payload);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = () => {
          dispatch({
            type: wsAction.wsSuccess,
            payload: "Открывается соединение",
          });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = () => {
          dispatch({ type: wsAction.wsError, payload: "Произошла ошибка" });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: wsAction.wsMessage, payload: parsedData });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = () => {
          dispatch({
            type: wsAction.wsClose,
            payload: "Соединение закрыто",
          });
        };
        if (action.type === wsAction.wsClose) {
          socket.close(1000, action.payload);
        }
      }

      next(action);
    };
  }) as Middleware;
};
