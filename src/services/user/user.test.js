import {
  chekUserAuth,
  logoutUserRequest,
  dataСhangeRequest,
  userSlice,
  currentUserRequest,
  registerUserRequest,
  authUserRequest,
  resetPassword,
  forgotPassword,
} from "./user-slice";
import { initialState } from "./user-slice";

const StateForgot = {
  userLoaded: false,
  isPending: true,
  isAuthCheck: true,
  passwordReset: false,
  passwordForgot: false,
  success: true,
};

const StateWidthData = {
  userLoaded: false,
  isPending: true,
  isAuthCheck: true,
  data: {
    email: "romankechko98@yandex.ru",
    name: "roman",
  },
  passwordReset: false,
  passwordForgot: false,
  success: true,
};

describe("Тестируем слайс пользователя", () => {
  test("chekUserAuth тест", () => {
    expect(userSlice.reducer(initialState, chekUserAuth())).toEqual({
      userLoaded: false,
      isPending: false,
      isAuthCheck: true,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: false,
    });
  });
  test("resetPassword тест", () => {
    expect(
      userSlice.reducer(initialState, {
        type: resetPassword.pending.type,
      })
    ).toEqual({
      userLoaded: false,
      isPending: true,
      isAuthCheck: false,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: false,
    });
  });
  test("currentUserRequest тест", () => {
    expect(
      userSlice.reducer(initialState, {
        type: currentUserRequest.pending.type,
      })
    ).toEqual({
      userLoaded: false,
      isPending: true,
      isAuthCheck: false,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: false,
    });
  });
  test("authUserRequest тест", () => {
    expect(
      userSlice.reducer(initialState, {
        type: authUserRequest.pending.type,
      })
    ).toEqual({
      userLoaded: false,
      isPending: true,
      isAuthCheck: false,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: false,
    });
  });
  test("registerUserRequest тест", () => {
    expect(
      userSlice.reducer(initialState, {
        type: registerUserRequest.pending.type,
      })
    ).toEqual({
      userLoaded: false,
      isPending: true,
      isAuthCheck: false,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: false,
    });
  });
  test("dataСhangeRequest тест", () => {
    expect(
      userSlice.reducer(initialState, {
        type: dataСhangeRequest.pending.type,
      })
    ).toEqual({
      userLoaded: false,
      isPending: true,
      isAuthCheck: false,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: false,
    });
  });
  test("logoutUserRequest тест", () => {
    expect(
      userSlice.reducer(StateWidthData, {
        type: logoutUserRequest.pending.type,
      })
    ).toEqual(StateWidthData);
  });
  test("forgotPassword тест", () => {
    expect(
      userSlice.reducer(initialState, {
        type: "user/forgotPassword/pending",
      })
    ).toEqual({
      userLoaded: false,
      isPending: true,
      isAuthCheck: false,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: false,
    });
  });
  test("currentUserRequest загрузка", () => {
    expect(
      userSlice.reducer(initialState, {
        type: currentUserRequest.fulfilled.type,
        payload: {
          user: {
            email: "romankechko98@yandex.ru",
            name: "roman",
          },
        },
      })
    ).toEqual({
      userLoaded: false,
      isPending: false,
      isAuthCheck: false,
      data: {
        email: "romankechko98@yandex.ru",
        name: "roman",
      },
      passwordReset: false,
      passwordForgot: false,
      success: true,
    });
  });
  test("authUserRequest загрузка", () => {
    expect(
      userSlice.reducer(initialState, {
        type: authUserRequest.fulfilled.type,
        payload: {
          user: {
            email: "romankechko98@yandex.ru",
            name: "roman",
          },
        },
      })
    ).toEqual({
      userLoaded: false,
      isPending: false,
      isAuthCheck: false,
      data: {
        email: "romankechko98@yandex.ru",
        name: "roman",
      },
      passwordReset: false,
      passwordForgot: false,
      success: true,
    });
  });
  test("registerUserRequest загрузка", () => {
    expect(
      userSlice.reducer(initialState, {
        type: registerUserRequest.fulfilled.type,
        payload: {
          user: {
            email: "romankechko98@yandex.ru",
            name: "roman",
          },
        },
      })
    ).toEqual({
      userLoaded: false,
      isPending: false,
      isAuthCheck: false,
      data: {
        email: "romankechko98@yandex.ru",
        name: "roman",
      },
      passwordReset: false,
      passwordForgot: false,
      success: true,
    });
  });
  test("dataСhangeRequest загрузка", () => {
    expect(
      userSlice.reducer(initialState, {
        type: dataСhangeRequest.fulfilled.type,
        payload: {
          user: {
            email: "romankechko98@yandex.ru",
            name: "roman",
          },
        },
      })
    ).toEqual({
      userLoaded: false,
      isPending: false,
      isAuthCheck: false,
      data: {
        email: "romankechko98@yandex.ru",
        name: "roman",
      },
      passwordReset: false,
      passwordForgot: false,
      success: true,
    });
  });

  test("logoutUserRequest загрузка", () => {
    expect(
      userSlice.reducer(StateWidthData, {
        type: logoutUserRequest.fulfilled.type,
      })
    ).toEqual({
      userLoaded: false,
      isPending: false,
      isAuthCheck: true,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: true,
    });
  });
  test("forgotPassword загрузка", () => {
    expect(
      userSlice.reducer(StateForgot, {
        type: forgotPassword.fulfilled.type,
      })
    ).toEqual({
      userLoaded: false,
      isPending: false,
      isAuthCheck: true,

      passwordReset: false,
      passwordForgot: true,
      success: true,
    });
  });

  test("chekUserAuth ошибка загрузки", () => {
    expect(userSlice.reducer(initialState, chekUserAuth())).toEqual({
      userLoaded: false,
      isPending: false,
      isAuthCheck: true,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: false,
    });
  });
  test("resetPassword ошибка загрузки", () => {
    expect(
      userSlice.reducer(initialState, {
        type: resetPassword.pending.type,
      })
    ).toEqual({
      userLoaded: false,
      isPending: true,
      isAuthCheck: false,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: false,
    });
  });
  test("currentUserRequest ошибка загрузки", () => {
    expect(
      userSlice.reducer(initialState, {
        type: currentUserRequest.pending.type,
      })
    ).toEqual({
      userLoaded: false,
      isPending: true,
      isAuthCheck: false,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: false,
    });
  });
  test("authUserRequest ошибка загрузки", () => {
    expect(
      userSlice.reducer(initialState, {
        type: authUserRequest.pending.type,
      })
    ).toEqual({
      userLoaded: false,
      isPending: true,
      isAuthCheck: false,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: false,
    });
  });
  test("registerUserRequest ошибка загрузки", () => {
    expect(
      userSlice.reducer(initialState, {
        type: registerUserRequest.pending.type,
      })
    ).toEqual({
      userLoaded: false,
      isPending: true,
      isAuthCheck: false,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: false,
    });
  });
  test("dataСhangeRequest ошибка загрузки", () => {
    expect(
      userSlice.reducer(initialState, {
        type: dataСhangeRequest.pending.type,
      })
    ).toEqual({
      userLoaded: false,
      isPending: true,
      isAuthCheck: false,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: false,
    });
  });
  test("logoutUserRequest ошибка загрузки", () => {
    expect(
      userSlice.reducer(StateWidthData, {
        type: logoutUserRequest.pending.type,
      })
    ).toEqual(StateWidthData);
  });
  test("forgotPassword ошибка загрузки", () => {
    expect(
      userSlice.reducer(initialState, {
        type: "user/forgotPassword/pending",
      })
    ).toEqual({
      userLoaded: false,
      isPending: true,
      isAuthCheck: false,
      data: null,
      passwordReset: false,
      passwordForgot: false,
      success: false,
    });
  });
});
