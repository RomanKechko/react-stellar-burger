import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "../../utils/token";
import { url } from "../../utils/chek-response";

const initialState = {
  userLoaded: false,
  isPending: false,
  isAuthCheck: false,
  data: null,
  registerSuccess: true,
  authSuccess: true,
  passwordReset: false,
  passwordForgot: false,
  success: false,
};

export const currentUserRequest = createAsyncThunk(
  `user/currentUserRequest`,
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      if (getAccessToken()) {
        const data = await fetch(`${url}/auth/user`, {
          method: "GET",
          headers: { Authorization: getAccessToken() },
        });
        if (!data.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await data.json();
        dispatch(chekUserAuth());
        return fulfillWithValue(responseData);
      } else {
        dispatch(chekUserAuth());
        return fulfillWithValue(null);
      }
    } catch (error) {
      dispatch(chekUserAuth());
      return rejectWithValue(error);
    }
  }
);

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
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
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
        const data = await fetch(
          "https://norma.nomoreparties.space/api/auth/user",
          {
            method: "PATCH",
            headers: { Authorization: getAccessToken() },
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
      .addCase(currentUserRequest.fulfilled, (state, action) => {
        state.success = true;
        state.isPending = false;
        state.data = action.payload.user;
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
      });
  },
});

export const { chekUserAuth } = userSlice.actions;
export default userSlice.reducer;
