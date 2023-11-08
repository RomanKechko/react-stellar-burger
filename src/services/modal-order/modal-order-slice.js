import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../../utils/chek-response";

const initialState = {
  status: null,
  loading: false,
};

export const setData = createAsyncThunk(
  "modalOrder/setData",
  async (data, thunkAPI) => {
    try {
      const res = await fetch(`${url}/orders`, {
        method: "POST",
        body: JSON.stringify({
          ingredients: data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const responseData = await res.json();
        return thunkAPI.fulfillWithValue(responseData);
      } else {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
  },
  extraReducers: (builder) => {
    builder.addCase(setData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setData.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
    });
  },
});
export const { closeModal } = modalOrderSlice.actions;
export default modalOrderSlice.reducer;
