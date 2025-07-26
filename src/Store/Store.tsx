import { configureStore } from "@reduxjs/toolkit";

import DrawerSlice from "./Drawer_Action/DrawerSlice";
import CartSlice from "./Cart_Action/Cart_Slice";
import FavouriteSlice from "./Favourite_Action/FavouriteSlice";
import OrderSlice from "./Order_Action/Order_Slice"
import SaleSlice from "./Sale_Action/Sale_Slice"
export const store = configureStore({
  reducer: {
    open: DrawerSlice,
    cart: CartSlice,
    favourite: FavouriteSlice,
    order: OrderSlice,
    sale: SaleSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
