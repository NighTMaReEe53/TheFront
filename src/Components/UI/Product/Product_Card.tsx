import { CiShoppingCart } from "react-icons/ci";
import type { IProduct } from "../../../Interfaces/Index";
import "./productCard.css";
import { FaHeart, FaRegEye } from "react-icons/fa";
import { JWT_Parsing } from "../../Config/Axios";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Store/Store";
import { GiStarsStack } from "react-icons/gi";
import { useEffect, useState } from "react";
import {
  GET_DATA_FAVOURITE,
  INCREASE_FAVOURITE,
} from "../../../Store/Favourite_Action/FavouriteSlice";
import { Remove_Favourite_Product, SEND_FAVOURTIE } from "../../Function/Index";
import { MdDeleteSweep } from "react-icons/md";
import { Link } from "react-router-dom";
import { ADD_TO_CART, INCREMENT } from "../../../Store/Cart_Action/Cart_Slice";
interface product {
  product: IProduct;
  isShow?: boolean;
}

const Product_Card = ({ product, isShow = true }: product) => {
  const dispatch = useDispatch<AppDispatch>();
  const { counter } = useSelector((state: RootState) => state.cart);
  const { favouriteCart } = useSelector((state: RootState) => state.favourite);

  const [count, setCount] = useState<number>(0);

  useEffect(() => {}, [counter]);
  useEffect(() => {}, [count]);

  useEffect(() => {
    dispatch(GET_DATA_FAVOURITE());
  }, []);

  return (
    <div className="box-content">
      <img src={product.attributes.image.data[0].attributes.url} alt="" />
      <div className="text">
        <h2>{product.attributes.title}</h2>
        <p>{product.attributes.description}</p>
        <span>
          Price Is : <span>{product.attributes.price} EGP</span> Instead Of{" "}
          <del>{product.attributes.price + product.attributes.price} EGP</del>
        </span>
        <div className="stars">
          <GiStarsStack size={22} color="#ffc107" />
          <GiStarsStack size={22} color="#ffc107" />
          <GiStarsStack size={22} color="#ffc107" />
          <GiStarsStack size={22} color="#ffc107" />
          <GiStarsStack size={22} color="#ffc107" />
        </div>
      </div>
      <div className="btns">
        <button
          className="main-btn"
          onClick={() => {
            dispatch(ADD_TO_CART(product));
            dispatch(INCREMENT());
          }}
        >
          اضافة الي <CiShoppingCart size={25} />{" "}
        </button>
        <Link
          to={`/product/${product.attributes.category_name}/${product.id}`}
          className="secondary-btn"
        >
          عرض تفاصيل <FaRegEye size={25} />
        </Link>
      </div>{" "}
      {isShow ? (
        JWT_Parsing ? (
          <div
            className="danger-btn"
            onClick={() => {
              SEND_FAVOURTIE(favouriteCart, product);
              dispatch(INCREASE_FAVOURITE());
              setCount((count) => (count += 1));
            }}
          >
            <FaHeart size={22} />
            اضافة الي المفضلة
          </div>
        ) : null
      ) : (
        <button
          className="danger-btn"
          onClick={() => {
            Remove_Favourite_Product(favouriteCart, product);
            dispatch(INCREASE_FAVOURITE());
          }}
        >
          <MdDeleteSweep size={22} />
          حذف من المفضلة
        </button>
      )}
    </div>
  );
};

export default Product_Card;
