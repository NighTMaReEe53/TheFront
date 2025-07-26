import { useEffect, useState } from "react";
import { AxiosInterface } from "../Components/Config/Axios";
import type { IProduct } from "../Interfaces/Index";
import "./product.css";
import Title from "../Components/Title/Title";
import { CiShoppingCart } from "react-icons/ci";
import { FaHeart, FaRegEye } from "react-icons/fa";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Store/Store";
import { INCREASE_FAVOURITE } from "../Store/Favourite_Action/FavouriteSlice";
import { SEND_FAVOURTIE } from "../Components/Function/Index";
import { Link } from "react-router-dom";
import { ADD_TO_CART, INCREMENT } from "../Store/Cart_Action/Cart_Slice";
import toast from "react-hot-toast";

const Product = () => {
  const JWT_Storge = window.localStorage.getItem("JWT");
  const JWT_Parsing = JWT_Storge ? JSON.parse(JWT_Storge) : null;
  const dispatch = useDispatch<AppDispatch>();

  const [count, setCount] = useState<number>(0);

  const [Product, setProduct] = useState<IProduct[]>([]);

  const { favouriteCart } = useSelector((state: RootState) => state.favourite);

  const GET_DATA = async () => {
    const { data } = await AxiosInterface.get("products?populate=*");

    setProduct(data.data);
  };

  useEffect(() => {}, [count]);

  // ------------------------------------------- Function ---------------------------------

  // ------------------------------------------- Function ---------------------------------

  useEffect(() => {
    GET_DATA();
  }, []);

  const MY_PRODUCT = Product.map((product) => {
    return (
      <SwiperSlide key={product.id}>
        <div className="box">
          <div className="image">
            <img
              src={`${product.attributes?.image?.data[0]?.attributes?.url}`}
              alt=""
            />
          </div>
          <div className="text">
            <h2>{product.attributes.title}</h2>
            <p>{product.attributes.description}</p>
            <span>
              Price : <span>{product.attributes.price}</span> EGP Instead Of
              <del> {product.attributes.price + product.attributes.price}</del>
            </span>
            <div className="btns">
              <button
                className="main-btn"
                onClick={() => {
                  if (JWT_Parsing) {
                    dispatch(ADD_TO_CART(product));
                    dispatch(INCREMENT());
                  } else {
                    toast.error("لازم تسجل الدخول الاول", {
                      duration: 1500,
                      position: "top-left"
                    })
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
            </div>
            {JWT_Parsing && (
              <button
                className="danger-btn"
                onClick={() => {
                  SEND_FAVOURTIE(favouriteCart, product);
                  dispatch(INCREASE_FAVOURITE());
                  setCount((count) => (count += 1));
                }}
              >
                <FaHeart size={22} />
                اضافة الي المفضلة
              </button>
            )}
          </div>
        </div>
      </SwiperSlide>
    );
  });

  return (
    <div className="product">
      <div className="spikes-down"></div>
      <Title text="المنتجات الرائدة" isShow={false} />
      <div className="container ">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          navigation={true}
          slidesPerView={4}
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
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {MY_PRODUCT}
        </Swiper>
      </div>
    </div>
  );
};

export default Product;
