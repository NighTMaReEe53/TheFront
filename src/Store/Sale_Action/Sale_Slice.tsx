import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInterface, JWT_Parsing } from "../../Components/Config/Axios";
import type { ISale_For_Product, ISale_Product } from "../../Interfaces/Index";

interface ISale {
  sale: ISale_Product[];
  product_Sales: ISale_For_Product[];
}

const initialState: ISale = {
  sale: [],
  product_Sales: [],
};

export const FETCH_DATA_SALE = createAsyncThunk(
  "Sale_Slice/GET_DATA",
  async () => {
    const { data } = await AxiosInterface.get("sales?populate=*", {
      headers: { Authorization: `Bearer ${JWT_Parsing}` },
    });

    return data.data;
  }
);
export const FETCH_DATA_SALE_FOR_ME = createAsyncThunk(
  "Sale_Slice/GET_SALE_DATA",
  async () => {
    const { data } = await AxiosInterface.get("users/me?populate=*", {
      headers: { Authorization: `Bearer ${JWT_Parsing}` },
    });

    return data.sales;
  }
);

const Sale_Slice = createSlice({
  name: "Sale_Slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FETCH_DATA_SALE.fulfilled, (state, action) => {
      state.sale = action.payload;
    });
    builder.addCase(FETCH_DATA_SALE_FOR_ME.fulfilled, (state, action) => {
      state.product_Sales = action.payload;
    });
  },
});

export default Sale_Slice.reducer;
