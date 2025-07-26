import { Link, useParams } from "react-router-dom";
import {
  AxiosInterface,
  JWT_Parsing,
  MY_URL_IMAGE,
} from "../Components/Config/Axios";
import { useEffect, useState } from "react";
import type { IProduct, IProduct_Single } from "../Interfaces/Index";
import { IoStarSharp } from "react-icons/io5";
import "../Styles/SingleProduct.css";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Store/Store";
import {
  ADD_TO_CART,
  ADD_TO_CART_QTY,
  DECREMENT_QTY,
  INCREMENT,
  INCREMENT_QTY,
} from "../Store/Cart_Action/Cart_Slice";
import Title from "../Components/Title/Title";
import Skeleton from "../Components/UI/Skeleton/Skeleton";
import { SEND_FAVOURTIE } from "../Components/Function/Index";
import { INCREASE_FAVOURITE } from "../Store/Favourite_Action/FavouriteSlice";
import { FaHeart, FaRegEye } from "react-icons/fa";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import toast from "react-hot-toast";

const SingleProduct = () => {
  const { Id, productName } = useParams();

  const MyID = Id ? Id : 1;

  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();

  const [product, setProduct] = useState<IProduct_Single>();

  const [theProduct, setTheProduct] = useState<IProduct[]>([]);

  const { count_qty, disapled_Increment, disapled_Decrement } = useSelector(
    (state: RootState) => state.cart
  );
  const { favouriteCart } = useSelector((state: RootState) => state.favourite);

  const GET_PRODUCT_SINGLE = async () => {
    setLoading(true);
    try {
      const { data } = await AxiosInterface.get(`products/${Id}?populate=*`);

      setProduct(data.data);
    } finally {
      setLoading(false);
    }
  };

  const PRODUCT_BY_CATEGORY = async () => {
    const { data } = await AxiosInterface.get(
      `products?populate=*&filters[categories][name_eng][$eq]=${productName}`
    );

    setTheProduct(data.data);
  };

  useEffect(() => {
    GET_PRODUCT_SINGLE();
    PRODUCT_BY_CATEGORY();
  }, [Id]);

  const PRODUCT_FILTER = theProduct.filter((item) => item.id != +MyID);

  const My_Product = PRODUCT_FILTER.map((product) => {
    return (
      <SwiperSlide key={product.id}>
        <div className="box-similar">
          <div className="image">
            <img
              src={`${MY_URL_IMAGE}${product.attributes?.image?.data[0]?.attributes?.url}`}
              alt=""
            />
          </div>
          <div className="text">
            <h2>{product.attributes.title}</h2>
            <p>{product.attributes.description}</p>
            <span>
              السعر <span>{product.attributes.price}</span> جنيه بدلا من
              <del> {product.attributes.price + product.attributes.price} جنيه</del>
            </span>
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
            </div>
            {JWT_Parsing && (
              <button
                className="danger-btn"
                onClick={() => {
                  SEND_FAVOURTIE(favouriteCart, product);
                  dispatch(INCREASE_FAVOURITE());
                }}
              >
                اضافة الي المفضلة
                <FaHeart size={22} />
              </button>
            )}
          </div>
        </div>
      </SwiperSlide>
    );
  });

  if (loading) return <Skeleton />;

  return (
    <div className="myProduct">
      <div className="container">
        <div className="box">
          <div className="image">
            <img
              className="main-img"
              src={`${product?.attributes.image.data[0].attributes.url}`}
              alt=""
            />
          </div>
          <div className="text">
            <h2>{product?.attributes.title}</h2>
            <p>{product?.attributes.description}</p>
            <div className="info">
              <span className="price">
                السعر :- `{product?.attributes.price} EGP `
              </span>
              <span className="category-item">
                {product?.attributes.categories.data[0].attributes.name_eng} :
                قسم
              </span>
            </div>
            <div className="stars">
              <IoStarSharp size={22} color="#ffc107" />
              <IoStarSharp size={22} color="#ffc107" />
              <IoStarSharp size={22} color="#ffc107" />
              <IoStarSharp size={22} color="#ffc107" />
              <IoStarSharp size={22} color="#ffc107" />
            </div>

            <div className="btns-increase">
              الكمية :
              <button
                className={`cliecked ${disapled_Increment && "disapled"}`}
                onClick={() => {
                  dispatch(INCREMENT_QTY());
                }}
              >
                +
              </button>
              <span>{count_qty}</span>
              <button
                className={`cliecked ${disapled_Decrement && "disapled"}`}
                onClick={() => {
                  dispatch(DECREMENT_QTY());
                }}
              >
                -
              </button>
            </div>

            <div className="btns">
              <button
                className="main-btn"
                onClick={() => {
                  if (JWT_Parsing) {
                    dispatch(ADD_TO_CART_QTY(product));
                    dispatch(INCREMENT());
                  } else {
                    toast.error("لازم تسجل الدخول الاول", {
                      position: "top-center",
                      duration: 1500,
                    });
                  }
                }}
              >
                اضف الي العربة
                <CiShoppingCart size={25} />
              </button>
              <button
                className="danger-btn"
                onClick={() => {
                  if (JWT_Parsing) {
                    SEND_FAVOURTIE(favouriteCart, product);
                    dispatch(INCREASE_FAVOURITE());
                  } else {
                    toast.error("لازم تسجل الدخول الاول", {
                      position: "top-center",
                      duration: 1500,
                    });
                  }
                }}
              >
                اضف الي المفضلة
                <CiHeart size={22} />
              </button>
            </div>
          </div>
        </div>
        <Title text="منتجات المشابهة" isShow={true} />
        <div className="content-smiler">
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            navigation={true}
            slidesPerView={3}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              800: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }}
          >
            {My_Product}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
