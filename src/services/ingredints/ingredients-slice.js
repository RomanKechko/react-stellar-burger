import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url } from "../../utils/chek-response";
const initialState = {
  dataIngridients: [],
  dataRequest: false,
  downloadError: false,
};

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/ingredients`);

      if (res.ok) {
        const responseData = await res.json();
        return fulfillWithValue(responseData);
      } else {
        const errorData = await res.json();
        return rejectWithValue(errorData);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.dataRequest = true;
      state.downloadError = false;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.dataIngridients = action.payload;
      state.dataRequest = false;
      state.downloadError = false;
    });

    builder.addCase(getIngredients.rejected, (state, action) => {
      state.downloadError = action.payload;
      state.dataRequest = false;
    });
  },
});

export default ingredientsSlice.reducer;
