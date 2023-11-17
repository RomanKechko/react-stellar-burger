import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../../utils/token";
import checkResponse, { url } from "../../utils/chek-response";

const initialState = {
  userLoaded: false,
  isPending: false,
  isAuthCheck: false,
  data: null,
  passwordReset: false,
  passwordForgot: false,
  success: false,
};

export const currentUserRequest = createAsyncThunk(
  `user/currentUserRequest`,
  async (_, { fulfillWithValue, dispatch }) => {
    if (getAccessToken()) {
      const data = await fetchWithRefresh(`${url}/auth/user`, {
        method: "GET",
        headers: { Authorization: getAccessToken() },
      });
      if (data.success) {
        dispatch(chekUserAuth());
        return fulfillWithValue(data);
      }
      throw new Error("Network response was not ok");
    } else {
      dispatch(chekUserAuth());
      return fulfillWithValue(null);
    }
  }
);

const refreshToken = () => {
  return fetch(`${url}/auth/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      setAccessToken(refreshData.accessToken);
      setRefreshToken(refreshData.refreshToken);
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const authUserRequest = createAsyncThunk(
  `user/authUserRequest`,
  async (dataLogin, { fulfillWithValue }) => {
    const data = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataLogin),
    });
    const responseData = await checkResponse(data);
    setAccessToken(responseData.accessToken);
    setRefreshToken(responseData.refreshToken);
    return fulfillWithValue(responseData);
  }
);

export const registerUserRequest = createAsyncThunk(
  `user/registerUserRequest`,
  async (dataRegister, { fulfillWithValue }) => {
    const data = await fetch(`${url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataRegister),
    });
    const responseData = await checkResponse(data);
    setAccessToken(responseData.accessToken);
    setRefreshToken(responseData.refreshToken);
    return fulfillWithValue(responseData);
  }
);

export const dataСhangeRequest = createAsyncThunk(
  `user/dataСhangeRequest`,
  async (newData, { fulfillWithValue }) => {
    if (getAccessToken()) {
      const data = await fetchWithRefresh(`${url}/auth/user`, {
        method: "PATCH",
        headers: {
          Authorization: getAccessToken(),
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(newData),
      });

      const responseData = await checkResponse(data);
      return fulfillWithValue(responseData);
    }
  }
);

export const logoutUserRequest = createAsyncThunk(
  `user/logoutUserRequest `,
  async (_, { fulfillWithValue }) => {
    const refreshToken = getRefreshToken();
    const data = await fetch(`${url}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    const responseData = await checkResponse(data);
    removeAccessToken();
    removeRefreshToken();

    return fulfillWithValue(responseData);
  }
);

export const forgotPassword = createAsyncThunk(
  `user/forgotPassword `,
  async (dataEmail, { fulfillWithValue }) => {
    const data = await fetch(`${url}/password-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(dataEmail),
    });
    const responseData = await checkResponse(data);
    return fulfillWithValue(responseData);
  }
);
export const resetPassword = createAsyncThunk(
  `user/resetPassword `,
  async (dataPassword, { fulfillWithValue, rejectWithValue, dispatch }) => {
    const data = await fetch(`${url}/password-reset/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(dataPassword),
    });

    const responseData = await checkResponse(data);
    return fulfillWithValue(responseData);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    chekUserAuth: (state) => {
      state.isAuthCheck = true;
    },
    passwordForgot: (state) => {
      state.passwordForgot = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(resetPassword.pending, (state) => {
        state.isPending = true;
      })
      .addCase(currentUserRequest.fulfilled, (state, action) => {
        state.success = true;
        state.isPending = false;
        state.data = action.payload?.user;
      })
      .addCase(authUserRequest.fulfilled, (state, action) => {
        state.success = true;
        state.isPending = false;
        state.data = action.payload.user;
      })
      .addCase(registerUserRequest.fulfilled, (state, action) => {
        state.success = true;
        state.isPending = false;
        state.data = action.payload.user;
      })
      .addCase(dataСhangeRequest.fulfilled, (state, action) => {
        state.success = true;
        state.isPending = false;
        state.data = action.payload.user;
      })
      .addCase(logoutUserRequest.fulfilled, (state) => {
        state.success = true;
        state.isPending = false;
        state.data = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.success = true;
        state.isPending = false;
        state.passwordForgot = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.success = true;
        state.isPending = false;
        state.passwordForgot = false;
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isPending = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.success = false;
          state.isPending = false;
        }
      );
  },
});

export const { chekUserAuth, logoutUser, passwordForgot } = userSlice.actions;
export default userSlice.reducer;
