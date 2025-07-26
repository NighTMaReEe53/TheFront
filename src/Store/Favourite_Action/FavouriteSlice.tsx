import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInterface, JWT_Parsing } from "../../Components/Config/Axios";
import type { IProduct } from "../../Interfaces/Index";

interface IItem {
  product: IProduct;
  id?: number;
}
const initialState: IFavourite = {
  favouriteCart: [],
  count: 0,
};

interface IFavourite {
  favouriteCart: IItem[];
  count: number;
}

export const GET_DATA_FAVOURITE = createAsyncThunk(
  "FavouriteSlice/getFavourite",
  async () => {
    const { data } = await AxiosInterface.get("users/me?populate=*", {
      headers: { Authorization: `Bearer ${JWT_Parsing}` },
    });

    return data.favourites;
  }
);

const FavouriteSlice = createSlice({
  name: "FavouriteSlice",
  initialState,
  reducers: {
    INCREASE_FAVOURITE: (state) => {
      state.count++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GET_DATA_FAVOURITE.fulfilled, (state, action) => {
      state.favouriteCart = action.payload;
    });
  },
});

export const { INCREASE_FAVOURITE } = FavouriteSlice.actions;

export default FavouriteSlice.reducer;
