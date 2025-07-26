import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Store/Store";
import { useEffect, useState } from "react";
import {
  FETCH_DATA_Order,
  INCREMENT_Order,
} from "../Store/Order_Action/Order_Slice";
import Title from "../Components/Title/Title";
import type { IOrder } from "../Interfaces/Index";
import { IoStarSharp } from "react-icons/io5";
import "../Styles/OrderPage.css";
import { MdDeleteSweep } from "react-icons/md";
import Spinner from "../Components/Spinner/Spinner";
import { AxiosInterface, JWT_Parsing, MY_URL_IMAGE } from "../Components/Config/Axios";
import toast from "react-hot-toast";
import { BiSolidError } from "react-icons/bi";

const Order = () => {
  const { order, counter } = useSelector((state: RootState) => state.order);

  const months: string[] = [
    "يناير",
    "فبراير",
    "مارس",
    "ابريل",
    "مايو",
    "يونيو",
    "اغسطس",
    "سيبتمبر",
    "أكتوبر",
    "نوفبر",
    "ديسمبر",
  ];

  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(FETCH_DATA_Order());
  }, []);
  useEffect(() => {
    document.title = "الاوردر";
  }, []);
  useEffect(() => {
    dispatch(FETCH_DATA_Order());
  }, [counter]);

  const DeleteOrder = async (el: number) => {
    setLoading(true);

    const CONFRIEM = window.confirm("هل تريد حذف الاوردر بالفعل");

    if (CONFRIEM) {
      try {
        const { status } = await AxiosInterface.delete(`orders/${el}`, {
          headers: { Authorization: `Bearer ${JWT_Parsing}` },
        });

        if (status == 200) {
          toast.success("تم حذف الاوردر بنجاح", {
            position: `top-center`,
            duration: 1500,
          });
          dispatch(INCREMENT_Order());
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const MY_PRODUCT = order.map((theData: IOrder) => {
    return (
      <div className="main-div">
        <button
          className="danger-btn"
          title="حذف الاوردر"
          onClick={() => DeleteOrder(theData.id)}
        >
          {loading ? <Spinner /> : <MdDeleteSweep size={25} />}
        </button>

        {theData.attributes.products.map((item) => {
          const theDate = new Date(theData.attributes.createdAt);

          return (
            <div className="box" key={item.id}>
              <img src={`${MY_URL_IMAGE}${item.image}`} alt="" />
              <div className="text">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <div className="info">
                  <div className="stars">
                    <IoStarSharp size={25} color="#ffc107" />
                    <IoStarSharp size={25} color="#ffc107" />
                    <IoStarSharp size={25} color="#ffc107" />
                    <IoStarSharp size={25} color="#ffc107" />
                  </div>
                  <div className="details">
                    <span className="qty">QTY :- {item.qty}</span>
                    <div className="price">{+item.price * +item.qty} EGP</div>
                  </div>
                </div>
                <div className="user">
                  <img src="image/user.png" alt="" />
                  <div className="text-user">
                    <h2>
                      {theData.attributes.firstName}{" "}
                      {theData.attributes.lastName}
                    </h2>
                    <div className="details">
                      <div>
                        <p>
                          العنوان {theData.attributes.address} / شارع{" "}
                          {theData.attributes.street}
                        </p>
                        <p>رقم الهاتف : {theData.attributes.phone}</p>
                      </div>
                      <div className="order-time">
                        <h2>تم عمل هذا الاوردر</h2>
                        <h2>
                          {" "}
                          {theDate.getDate()} / {months[theDate.getMonth()]} /{" "}
                          {theDate.getFullYear()}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className="myOrders">
      {order.length ? <Title text="الاوردرات الخاصة بك" isShow={true} /> : null}
      <div className="container">
        {order.length ? (
          <div className="content-boxes">{MY_PRODUCT}</div>
        ) : (
          <h2 className="no-order">
            <BiSolidError size={50} />
            لا توجد اوردرات قمت بها من قبل
          </h2>
        )}
      </div>
    </div>
  );
};

export default Order;
