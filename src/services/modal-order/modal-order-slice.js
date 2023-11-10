import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../../utils/chek-response";
import { fetchWithRefresh } from "../user/user-slice";
import { getAccessToken } from "../../utils/token";

const initialState = {
  status: null,
  loading: false,
  authorizationPage: false,
};

export const setData = createAsyncThunk(
  "modalOrder/setData",
  async (data, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      if (getAccessToken()) {
        const res = await fetchWithRefresh(`${url}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: getAccessToken(),
          },
          body: JSON.stringify({
            ingredients: data,
          }),
        });

        if (res.success) {
          return fulfillWithValue(res);
        } else {
          return rejectWithValue(res);
        }
      } else {
        dispatch(openTheAuthorizationWindow());
        return fulfillWithValue(null);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const modalOrderSlice = createSlice({
  name: "modalOrder",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.status = null;
    },
    openTheAuthorizationWindow: (state) => {
      state.authorizationPage = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setData.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.authorizationPage = false;
    });
    builder.addCase(setData.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const { closeModal, openTheAuthorizationWindow } =
  modalOrderSlice.actions;
export default modalOrderSlice.reducer;
