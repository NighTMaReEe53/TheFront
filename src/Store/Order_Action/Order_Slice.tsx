import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInterface, JWT_Parsing } from "../../Components/Config/Axios";
import type { IOrder } from "../../Interfaces/Index";

interface Order {
  order: IOrder[];
  counter: number;
}

const initialState: Order = {
  order: [],
  counter: 0,
};

export const FETCH_DATA_Order = createAsyncThunk(
  "Order_Slice/GET_DATA",
  async () => {
    const { data } = await AxiosInterface.get("orders", {
      headers: { Authorization: `Bearer ${JWT_Parsing}` },
    });
    return data.data;
  }
);

const Order_Slice = createSlice({
  name: "Order_Slice",
  initialState,
  reducers: {
    INCREMENT_Order: (state) => {
      state.counter++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FETCH_DATA_Order.fulfilled, (state, action) => {
      state.order = action.payload;
    });
  },
});

export const { INCREMENT_Order } = Order_Slice.actions;

export default Order_Slice.reducer;
