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
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
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
    } catch (error) {
      dispatch(chekUserAuth());
      return rejectWithValue(error.stringify());
    }
  }
);

const refreshToken = () => {
  return fetch("https://norma.nomoreparties.space/api/auth/token", {
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
  async (dataLogin, { fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataLogin),
      });
      if (data.ok) {
        const responseData = await data.json();
        setAccessToken(responseData.accessToken);
        setRefreshToken(responseData.refreshToken);
        console.log(responseData);
        return fulfillWithValue(responseData);
      } else {
        const errorData = await data.json();
        return rejectWithValue(errorData);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUserRequest = createAsyncThunk(
  `user/registerUserRequest`,
  async (dataRegister, { fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRegister),
      });

      if (data.ok) {
        const responseData = await data.json();
        setAccessToken(responseData.accessToken);
        setRefreshToken(responseData.refreshToken);
        console.log(responseData);
        return fulfillWithValue(responseData);
      } else {
        const errorData = await data.json();
        return rejectWithValue(errorData);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const dataСhangeRequest = createAsyncThunk(
  `user/dataСhangeRequest`,
  async (newData, { fulfillWithValue, rejectWithValue }) => {
    try {
      if (getAccessToken()) {
        const data = await fetchWithRefresh(
          "https://norma.nomoreparties.space/api/auth/user",
          {
            method: "PATCH",
            headers: {
              Authorization: getAccessToken(),
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(newData),
          }
        );

        if (!data.ok) {
          throw new Error(console.log(`HTTP error! status: ${data.status}`));
        }
        const responseData = await data.json();
        return fulfillWithValue(responseData);
      } else {
        return fulfillWithValue(null);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUserRequest = createAsyncThunk(
  `user/logoutUserRequest `,
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const refreshToken = getRefreshToken();
      const data = await fetch(`${url}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ token: refreshToken }),
      });

      if (data.ok) {
        const responseData = await data.json();
        removeAccessToken();
        removeRefreshToken();

        return fulfillWithValue(responseData);
      } else {
        const errorData = await data.json();
        return rejectWithValue(errorData);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  `user/forgotPassword `,
  async (dataEmail, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const data = await fetch(`${url}/password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(dataEmail),
      });
      if (data.ok) {
        const responseData = await data.json();

        return fulfillWithValue(responseData);
      }
      const errorData = await data.json();
      return rejectWithValue(errorData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const resetPassword = createAsyncThunk(
  `user/resetPassword `,
  async (dataPassword, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const data = await fetch(`${url}/password-reset/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(dataPassword),
      });

      if (data.ok) {
        const responseData = await data.json();
        return fulfillWithValue(responseData);
      }
      const errorData = await data.json();
      return rejectWithValue(errorData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    chekUserAuth: (state) => {
      state.isAuthCheck = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currentUserRequest.pending, (state) => {
        state.isPending = true;
      })
      .addCase(authUserRequest.pending, (state) => {
        state.isPending = true;
      })
      .addCase(registerUserRequest.pending, (state) => {
        state.isPending = true;
      })
      .addCase(dataСhangeRequest.pending, (state) => {
        state.isPending = true;
      })
      .addCase(logoutUserRequest.pending, (state) => {
        state.isPending = true;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isPending = true;
      })
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
      .addCase(currentUserRequest.rejected, (state) => {
        state.isPending = false;
        state.success = false;
      })
      .addCase(authUserRequest.rejected, (state) => {
        state.success = false;
        state.isPending = false;
      })
      .addCase(registerUserRequest.rejected, (state) => {
        state.success = false;
        state.isPending = false;
      })
      .addCase(dataСhangeRequest.rejected, (state) => {
        state.success = false;
        state.isPending = false;
      })
      .addCase(logoutUserRequest.rejected, (state) => {
        state.success = false;
        state.isPending = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.success = false;
        state.isPending = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.success = false;
        state.isPending = false;
      });
  },
});

export const { chekUserAuth, logoutUser } = userSlice.actions;
export default userSlice.reducer;
