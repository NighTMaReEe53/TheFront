import { createSlice } from "@reduxjs/toolkit";

const initialState: { open: boolean } = {
  open: false,
};

const DrawerSlice = createSlice({
  name: "DrawerSlice",
  initialState,
  reducers: {
    OPENDRAWER: (state) => {
      state.open = !state.open;
    },
  },
});

export const {OPENDRAWER} = DrawerSlice.actions;
export default DrawerSlice.reducer;
