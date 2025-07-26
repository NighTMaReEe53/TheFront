/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoStarSharp } from "react-icons/io5";
import "../Styles/order.css";
import { GoListOrdered } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Store/Store";
import { FaRegSquareCheck } from "react-icons/fa6";
import {
  DELETE_PRODUCT_FROM_CART,
  INCREMENT,
} from "../Store/Cart_Action/Cart_Slice";
import { useEffect, useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { PiVanFill } from "react-icons/pi";
import { Order_Schema } from "../Validation/Index";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Error from "../Components/Error/Index";
import { AxiosInterface, JWT_Parsing } from "../Components/Config/Axios";
import toast from "react-hot-toast";
import Spinner from "../Components/Spinner/Spinner";

interface IOrder {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  address: string;
}

const Check_Order = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const emailFromLocal = window.localStorage.getItem("Email");
  const emailParsing = emailFromLocal ? JSON.parse(emailFromLocal) : null;
  const [loading, setLoading] = useState<boolean>(false);
  const naviagtion = useNavigate();

  // -------------------------------------------------------------------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrder>({
    resolver: yupResolver(Order_Schema),
  });
  const onSubmit: SubmitHandler<IOrder> = async (data: IOrder) => {
    setLoading(true);
    try {
      const { status } = await AxiosInterface.post(
        "orders",
        {
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            street: data.street,
            products: cart,
          },
        },
        { headers: { Authorization: `Bearer ${JWT_Parsing}` } }
      );

      if (status == 200) {
        toast.success("تم عمل الاوردر بنجاح", {
          position: `top-center`,
          duration: 2000,
        });

        for (let i = 0; i < cart.length; i++) {
          await AxiosInterface.delete(`carts/${cart[i].id}`, {
            headers: { Authorization: `Bearer ${JWT_Parsing}` },
          });
        }

        dispatch(INCREMENT());

        setTimeout(() => {
          naviagtion("/order");
        }, 1000);
      }
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------------------------

  const TOTAL = cart.reduce((acc, current) => {
    acc += +current.price * +current.qty;

    return acc;
  }, 0);

  const [count, setCount] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    document.title = `استكمال طلب الشراء`;
  }, []);

  useEffect(() => {}, [count]);

  const MY_PRODUCT = cart.map((item) => {
    return (
      <div className="box" key={item.id}>
        <img src={`${item.image}`} alt="" />
        <div className="text">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <div className="stars">
            <IoStarSharp size={20} color="#ffc107" />
            <IoStarSharp size={20} color="#ffc107" />
            <IoStarSharp size={20} color="#ffc107" />
            <IoStarSharp size={20} color="#ffc107" />
            <IoStarSharp size={20} color="#ffc107" />
          </div>
          <div className="info">
            <span className="price">
              السعر :- <span>{item.price} جنيه</span>
            </span>
            <div className="item">
              <span className="qty">QTY : {item.qty}</span>
              <div
                className="delete"
                onClick={() => {
                  dispatch(DELETE_PRODUCT_FROM_CART(item.id));
                  dispatch(INCREMENT());
                  setCount((count) => count + 1);
                }}
              >
                <MdDeleteForever color="var(--whiteColor)" size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="order">
      <div className="overlay-image">
        <h2>استكمال طلب الشراء</h2>
      </div>
      <div className="container">
        <div className={`left ${!cart.length && "nothing"}`}>
          <h2>تفاصيل الفاتورة</h2>
          <form>
            <div className="main">
              <div>
                <label>الاسم الاول</label>
                <input type="text" {...register("firstName")} />
                <Error text={errors["firstName"]?.message} />
              </div>
              <div>
                <label>الاسم الاخير</label>
                <input type="text" {...register("lastName")} />
                <Error text={errors["lastName"]?.message} />
              </div>
            </div>
            <label>البريد الالكتروني</label>
            <input
              type="email"
              {...register("email")}
              value={emailParsing}
              disabled
            />
            <Error text={errors["email"]?.message} />

            <label>الهاتف</label>
            <input type="text" {...register("phone")} />
            <Error text={errors["phone"]?.message} />

            <label>المدينة</label>
            <input type="text" {...register("address")} />
            <Error text={errors["address"]?.message} />

            <label>الشارع</label>
            <input type="text" {...register("street")} />
            <Error text={errors["street"]?.message} />
          </form>
        </div>
        <div className={`right`}>
          <h2>
            <GoListOrdered size={25} />
            طلبك هنا
          </h2>
          <div className="content-boxes">
            {cart.length ? (
              MY_PRODUCT
            ) : (
              <>
                <div className="text-overlay">
                  <HiOutlineShoppingCart size={50} />
                  لم تقم بأضافة منتجات
                </div>
                <Link to={"/products"} className="secondary-btn">
                  تصفح المنتجات
                </Link>
              </>
            )}
          </div>
          {cart.length ? (
            <>
              <div className="total">
                <h2>الاجمالي :-</h2>
                <span> {TOTAL} جنيه</span>
              </div>
              <button
                className="secondary-btn"
                onClick={handleSubmit(onSubmit)}
              >
                {loading ? <Spinner /> : <FaRegSquareCheck size={25} />}
                تأكيد الطلب
              </button>
              <div className="check">
                <input type="radio" checked={true} />
                <div className="text">
                  <h2>
                    <PiVanFill size={25} />
                    الدفع عند الاستلام
                  </h2>
                  <p>هذي هي الوسيلة المتاحة حاليا</p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Check_Order;
