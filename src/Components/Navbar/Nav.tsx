import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Nav.css";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { MdOutlineMenuOpen } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store/Store";
import { OPENDRAWER } from "../../Store/Drawer_Action/DrawerSlice";
import { JWT_Parsing } from "../Config/Axios";
import Links_User from "./Links_User";
import { GET_DATA_FAVOURITE } from "../../Store/Favourite_Action/FavouriteSlice";
const Nav = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const { favouriteCart, count } = useSelector(
    (state: RootState) => state.favourite
  );
  const { order } = useSelector((state: RootState) => state.order);

  const [active, setActive] = useState<
    "Home" | "About" | "Product" | "Contact" | "sales" | "order"
  >("Home");

  const ref = useRef<HTMLDivElement>(null);

  // State

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [show, setIsShow] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  // End State

  useEffect(() => {
    dispatch(GET_DATA_FAVOURITE());
  }, [count]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 100) {
        ref.current?.classList.add("active");
      } else {
        ref.current?.classList.remove("active");
      }
    });
  }, []);

  return (
    <header className="nav" ref={ref}>
      <div
        className={`${isOpen && "overflow-all"}`}
        onClick={() => setIsOpen(!open)}
      ></div>
      <nav>
        <div className="container">
          <Link to={"/"}>
            <Logo />
          </Link>
          <ul className={`links ${isOpen && "show"}`}>
            <li>
              <Link
                to={"/"}
                className={`${active === "Home" ? "active" : ""}`}
                onClick={() => setActive("Home")}
              >
                الصفحة الرئيسية
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className={`${active === "About" ? "active" : ""}`}
                onClick={() => setActive("About")}
              >
                ماذا عنا
              </Link>
            </li>
            <li>
              <Link
                to={"/products"}
                className={`${active === "Product" ? "active" : ""}`}
                onClick={() => {
                  setActive("Product");
                }}
              >
                المنتجات 
              </Link>
            </li>
            {JWT_Parsing ? (
              <li>
                <Link
                  to={"/sales"}
                  className={`${active === "sales" ? "active" : ""}`}
                  onClick={() => {
                    setActive("sales");
                  }}
                >
                  المعروض للبيع
                </Link>
              </li>
            ) : null}
            {order.length ? (
              <li>
                <Link
                  to={"/order"}
                  className={`order-link ${active === "order" ? "active" : ""}`}
                  onClick={() => {
                    setActive("order");
                  }}
                >
                  <span>{order.length}</span>
                  الاوردارات
                </Link>
              </li>
            ) : null}
          </ul>
          <div className="btns">
            {JWT_Parsing ? (
              <>
                <span
                  className="menu"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                  }}
                >
                  {isOpen ? (
                    <IoCloseSharp size={30} color="#f05" />
                  ) : (
                    <MdOutlineMenuOpen size={30} />
                  )}
                </span>
                <span
                  className="cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(OPENDRAWER());
                  }}
                >
                  <CiShoppingCart size={30} />
                  <span>{cart.length}</span>
                </span>
                <Link to={"/favourite"} className="heart">
                  <span className="show-count">{favouriteCart.length}</span>
                  <CiHeart size={30} />
                </Link>

                <span className="user" onClick={() => setIsShow(!show)}>
                  {show ? (
                    <IoCloseSharp size={30} color="#f05" />
                  ) : (
                    <CiUser size={30} />
                  )}
                </span>
              </>
            ) : (
              <>
                <Link to={"/logins"} className="main-btn">
                  تسحيل الدخول
                </Link>
                <Link to={"/register"} className="secondary-btn">
                  انشاء حساب
                </Link>
              </>
            )}
          </div>
          {show && <Links_User />}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
