import { useDispatch, useSelector } from "react-redux";
import Title from "../Components/Title/Title";
import "../Styles/favourite.css";
import type { AppDispatch, RootState } from "../Store/Store";
import { useEffect } from "react";
import { GET_DATA_FAVOURITE } from "../Store/Favourite_Action/FavouriteSlice";
import Product_Card from "../Components/UI/Product/Product_Card";
import { FaRegHeart } from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player";
import Animation from "../../public/Animation/Favourite.json";

const Favourite = () => {
  const { favouriteCart, count } = useSelector(
    (state: RootState) => state.favourite
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(GET_DATA_FAVOURITE());
  }, []);
  useEffect(() => {}, [count]);

  useEffect(() => {
    document.title = "المفضلات";
  }, []);

  const MY_PRODUCT = favouriteCart.map((item) => {
    return (
      <Product_Card
        key={item.id}
        product={item.product}
        isShow={false}
      />
    );
  });

  return (
    <div className="favourite">
      <div className="animation">
        <Player src={Animation} autoplay loop />
      </div>
      <div className="animation-2">
        <Player src={Animation} autoplay loop />
      </div>
      {favouriteCart.length ? (
        <>
          <div className="content">
            <Title text="المفضل لك" isShow={true} />
            <div className="container">{MY_PRODUCT}</div>
          </div>
        </>
      ) : (
        <h2 className="no-heart">
          لا يوجد لديك اي منتجات مفضلة
          <FaRegHeart size={300} />
        </h2>
      )}
    </div>
  );
};

export default Favourite;
