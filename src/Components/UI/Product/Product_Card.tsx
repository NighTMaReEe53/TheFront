import { CiShoppingCart } from "react-icons/ci";
import type { IProduct } from "../../../Interfaces/Index";
import "./productCard.css";
import { FaHeart, FaRegEye } from "react-icons/fa";
import { JWT_Parsing, MY_URL_IMAGE } from "../../Config/Axios";
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
import {
  ADD_TO_CART,
  FETCH_DATA_CART,
  INCREMENT,
} from "../../../Store/Cart_Action/Cart_Slice";
import toast from "react-hot-toast";
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
      <img
        src={`${MY_URL_IMAGE}${product.attributes.image.data[0].attributes.url}`}
        alt=""
      />
      <div className="text">
        <h2>{product.attributes.title}</h2>
        <p>{product.attributes.description}</p>
        <span>
          السعر <span>{product.attributes.price} جنيه</span> بدلا من{" "}
          <del>{product.attributes.price + product.attributes.price} جنيه</del>
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
            if (JWT_Parsing) {
              dispatch(ADD_TO_CART(product));
              dispatch(INCREMENT());
              dispatch(FETCH_DATA_CART());
            } else {
              toast.error("لازم تسجل الدخول الاول", {
                position: "top-left",
                duration: 1500,
              });
            }
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
              dispatch(GET_DATA_FAVOURITE());
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
            dispatch(GET_DATA_FAVOURITE());
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
