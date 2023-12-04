import type { Middleware, MiddlewareAPI } from "redux";

import type { AppDispatch, RootState } from "../store";
import { IAction } from "../action/actions";
import { TFeed } from "../../types/interface";

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
      /*    console.log(action); */
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
          const parsedData: TFeed = JSON.parse(data);
          /*   console.log(parsedData); */

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
/* import { createSlice } from "@reduxjs/toolkit";
import { TFeed } from "../../types/interface";

type TWSState = {
  wsConnected: boolean;
  messages: TFeed | null;

  error?: Event | string;
};

const initialState: TWSState = {
  wsConnected: false,
  messages: null,
};
console.log(initialState.messages);
// Создадим редьюсер для WebSocket

export const wsReducer = createSlice({
  name: "ws",
  initialState,
  reducers: {
    wsConnectionSuccess: (state) => {
      state.error = undefined;
      state.wsConnected = true;
    },
    WsConnectionError: (state, action) => {
      state.error = action.payload;
      state.wsConnected = false;
    },
    WsConnectionMessage: (state, action) => {
      state.error = undefined;
      state.messages = action.payload;
      
    },
    WsConnectionClosed: (state) => {
      state.error = undefined;
      state.wsConnected = true;
    },
  },
});
export const {
  wsConnectionSuccess,
  WsConnectionError,
  WsConnectionMessage,
  WsConnectionClosed,
} = wsReducer.actions;
export default wsReducer.reducer;
 */
