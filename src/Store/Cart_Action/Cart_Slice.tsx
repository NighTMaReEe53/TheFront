import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ICart, IProduct } from "../../Interfaces/Index";
import {
  AxiosInterface,
  ID_Parsing,
  JWT_Parsing,
} from "../../Components/Config/Axios";
import toast from "react-hot-toast";

const initialState: {
  counter: number;
  count_qty: number;
  cart: ICart[];
  filter_cart: [];
  disapled_Increment: boolean;
  disapled_Decrement: boolean;
} = {
  counter: 0,
  cart: [],
  filter_cart: [],
  disapled_Increment: false,
  disapled_Decrement: true,
  count_qty: 1,
};

// --------------------------------------------Function -----------------------
export const POST_CART_DATA = async (product: IProduct) => {
  const { status } = await AxiosInterface.post(
    `carts`,
    {
      data: {
        title: product.attributes.title,
        image: product.attributes.image.data[0].attributes.url,
        description: product.attributes.description,
        price: product.attributes.price,
        qty: product.attributes.qty,
        product_id: product.id,
        users: [ID_Parsing],
      },
    },
    {
      headers: {
        Authorization: `Bearer ${JWT_Parsing}`,
      },
    }
  );

  if (status == 200) {
    toast.success("تم اضافة المنتج بنجاح", {
      position: `top-center`,
      duration: 1500,
    });
  }
};

export const FETCH_DATA_CART = createAsyncThunk(
  "Cart_Slice/GET_DATA",
  async () => {
    const { data } = await AxiosInterface.get(`users/me?populate=*`, {
      headers: { Authorization: `Bearer ${JWT_Parsing}` },
    });

    return data.carts;
  }
);

export const DELETE_PRODUCT_FROM_CART = createAsyncThunk(
  "Cart_Slice/DELETE_DATA",
  async (ID: number) => {
    const Confrim = window.confirm("هل انتا متأكد من حذف هذا المنتج ؟");

    if (Confrim) {
      const { status } = await AxiosInterface.delete(`carts/${ID}`, {
        headers: { Authorization: `Bearer ${JWT_Parsing}` },
      });

      if (status == 200) {
        toast.success("تم حذف المنتج بنجاح من العربة", {
          position: "top-center",
          duration: 1500,
        });
        INCREMENT();
      }
    }
  }
);

export const UPDATE_CART = async (ID: number, qty: number) => {
  const { status } = await AxiosInterface.put(
    `carts/${ID}`,
    {
      data: {
        qty: qty,
      },
    },
    { headers: { Authorization: `Bearer ${JWT_Parsing}` } }
  );

  if (status == 200) {
    toast.success("تم تعديل كمية المنتج بنجاح", {
      position: "top-center",
      duration: 1500,
    });
  }
};

// --------------------------------------------Function -----------------------

const CartSlice = createSlice({
  name: "Cart_Slice",
  initialState,

  reducers: {
    INCREMENT: (state) => {
      state.counter++;
    },
    INCREMENT_QTY: (state) => {
      if (state.count_qty >= 10) {
        state.count_qty = 10;
        state.disapled_Increment = true;
      } else {
        state.disapled_Increment = false;
        state.disapled_Decrement = false;
        state.count_qty++;
      }
    },
    DECREMENT_QTY: (state) => {
      if (state.count_qty <= 1) {
        state.disapled_Decrement = true;
        state.count_qty = 1;
      } else {
        state.disapled_Decrement = false;
        state.disapled_Increment = false;
        state.count_qty--;
      }
    },

    ADD_TO_CART: (state, action) => {
      const FINDED = state.cart.find(
        (item) => item.product_id == action.payload.id
      );

      if (FINDED) {
        toast.error("المنتج موجود بالفعل في عربة التسوق", {
          position: "top-center",
          duration: 1500,
        });
      } else {
        POST_CART_DATA(action.payload);
      }
    },
    ADD_TO_CART_QTY: (state, action) => {
      const FINDED = state.cart.find(
        (item) => item.product_id == action.payload.id
      );

      if (FINDED) {
        UPDATE_CART(FINDED.id, state.count_qty);
      } else {
        POST_CART_DATA(action.payload);
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(FETCH_DATA_CART.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export const {
  INCREMENT,
  ADD_TO_CART,
  INCREMENT_QTY,
  ADD_TO_CART_QTY,
  DECREMENT_QTY,
} = CartSlice.actions;
export default CartSlice.reducer;
