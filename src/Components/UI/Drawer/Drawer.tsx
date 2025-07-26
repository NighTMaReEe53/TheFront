import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Store/Store";
import {
  DELETE_PRODUCT_FROM_CART,
  FETCH_DATA_CART,
  INCREMENT,
} from "../../../Store/Cart_Action/Cart_Slice";
import Logo from "../../Logo/Logo";

import "./drawer.css";
import { OPENDRAWER } from "../../../Store/Drawer_Action/DrawerSlice";
import {
  MdOutlineDeleteSweep,
  MdOutlineRemoveShoppingCart,
} from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MY_URL_IMAGE } from "../../Config/Axios";

const Drawer = () => {
  const { cart, counter } = useSelector((state: RootState) => state.cart);
  const { open } = useSelector((state: RootState) => state.open);

  const dispatch = useDispatch<AppDispatch>();

  const TOTAL = cart.reduce((acc, current) => {
    acc += +current.price * +current.qty;

    return acc;
  }, 0);

  useEffect(() => {
    dispatch(FETCH_DATA_CART());
  }, [counter]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    }
  }, [open]);

  useEffect(() => {}, []);

  const MY_PRODUCT = cart.map((el) => {
    return (
      <div className="box" key={el.id}>
        <img src={`${MY_URL_IMAGE}${el.image}`} alt="" />
        <div className="text">
          <h2>{el.title}</h2>
          <p>{el.description}</p>
          <div className="info">
            <span>
              Price : <span>{el.price} EGP</span>
            </span>
            <span className="qty">QTY: {el.qty}</span>
          </div>
          <button
            className="danger-btn"
            onClick={() => {
              dispatch(DELETE_PRODUCT_FROM_CART(el.id));
              dispatch(INCREMENT());
              dispatch(FETCH_DATA_CART());
            }}
          >
            <MdOutlineDeleteSweep size={25} />
            حذف
          </button>
        </div>
      </div>
    );
  });

  return (
    <div
      className={`drawer ${open && "show"}`}
      onClick={() => {
        dispatch(OPENDRAWER());
      }}
    >
      <div className="content" onClick={(e) => e.stopPropagation()}>
        <Logo />
        {cart.length > 0 ? (
          <>
            <div className="content-boxes">{MY_PRODUCT}</div>
            <div className="total">
              <div className="prices">
                <h2>
                  <FaDollarSign size={22} />
                  المبلغ الكلي
                </h2>
                <span>{TOTAL} جنيه</span>
              </div>
              <Link to={"/check_order"} className="secondary-btn">
                <FaRegSquareCheck size={25} />
                استكمال الطلب
              </Link>
            </div>
          </>
        ) : (
          <div className="overlay-cart">
            <MdOutlineRemoveShoppingCart size={60} />
            <h2>لا توجد منتجات في العربة</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
