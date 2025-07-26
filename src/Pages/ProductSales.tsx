import { useDispatch, useSelector } from "react-redux";
import Title from "../Components/Title/Title";
import type { AppDispatch, RootState } from "../Store/Store";
import { useEffect, useState, type ChangeEvent } from "react";
import {
  FETCH_DATA_SALE,
  FETCH_DATA_SALE_FOR_ME,
} from "../Store/Sale_Action/Sale_Slice";
import {
  AxiosInterface,
  ID_Parsing,
  JWT_Parsing,
} from "../Components/Config/Axios";
import toast from "react-hot-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Sale_Schema } from "../Validation/Index";
import Error from "../Components/Error/Index";
import { PiCursorClick } from "react-icons/pi";
import { MdOutlineCloudUpload } from "react-icons/md";
import Spinner from "../Components/Spinner/Spinner";
import "../Styles/ProductSales.css";
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
interface ISale {
  title: string;
  description: string;
  price: string;
  whatsapp: string;
  facebook: string;
}

const ProductSales = () => {
  const { product_Sales } = useSelector((state: RootState) => state.sale);
  const dispatch = useDispatch<AppDispatch>();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    dispatch(FETCH_DATA_SALE_FOR_ME());
  }, []);
  useEffect(() => {
    document.title = "منتجاتك";
  }, []);

  useEffect(() => {
    dispatch(FETCH_DATA_SALE_FOR_ME());
  }, [count]);

  const [image, setImage] = useState<string>("");

  const [lightBox, setLightBox] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const deleteProduct = async (id: number) => {
    setLoading(true);

    const CONFRIM = window.confirm("هل تريد حذف المنتج بالفعل ؟");

    if (CONFRIM) {
      try {
        const { status } = await AxiosInterface.delete(`sales/${id}`, {
          headers: { Authorization: `Bearer ${JWT_Parsing}` },
        });

        if (status === 200) {
          toast.success("تم حذف المنتج الخاص بك بنجاح", {
            position: "top-center",
            duration: 1500,
          });
          dispatch(FETCH_DATA_SALE());
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISale>({
    resolver: yupResolver(Sale_Schema),
  });
  const onSubmit: SubmitHandler<ISale> = async (data: ISale) => {
    setLoading(true);

    try {
      const { status } = await AxiosInterface.post(
        "sales",
        {
          data: {
            title: data.title,
            description: data.description,
            price: data.price,
            whatsapp: data.whatsapp,
            facebook: data.facebook,
            image: image,
            users: [ID_Parsing],
          },
        },
        { headers: { Authorization: `Bearer ${JWT_Parsing}` } }
      );
      if (status == 200) {
        toast.success("تم رفع المنتج بنجاح علي قائمة المبيعات", {
          duration: 1500,
          position: "top-left",
        });
        setLightBox(!lightBox);
        data.description = "";
        data.facebook = "";
        data.price = "";
        data.title = "";
        data.facebook = "";
        setCount((count) => count + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  const changedInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    formData.append("files", e.target.files![0]);

    const { data } = await AxiosInterface.post("upload", formData, {
      headers: { Authorization: `Bearer ${JWT_Parsing}` },
    });

    setImage(data[0].url);
  };

  const MY_PRODUCT = product_Sales.map((el) => {
    return (
      <div className="sale-box" key={el.id}>
        <div className="image">
          <img src={el.image} alt="" />
        </div>
        <h2>اسم المنتج :- {el.title}</h2>
        <p>وصف المنتج :- {el.description}</p>
        <span>السعر :- {el.price} EGP</span>
        <div className="info">
          <h2>التواصل من خلال :-</h2>
          <div className="btns">
            <a target="_blank" className="whatsapp" href={`${el.whatsapp}`}>
              <FaWhatsapp size={25} />
            </a>
            <a target="_blank" href={`${el.facebook}`} className="facebook">
              <CiFacebook size={25} />
            </a>
          </div>
          <button className="danger-btn" onClick={() => deleteProduct(el.id)}>
            حذف المنتج
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="product_sales">
      <Title text="منتجات الخاصة بك" isShow={true} />
      <div
        className={`light-box ${lightBox && "active"}`}
        onClick={() => setLightBox(!lightBox)}
      >
        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="image">
            {image ? (
              <img src={image} className="myImage" alt="" />
            ) : (
              <>
                <input
                  type="file"
                  id="image"
                  required
                  onChange={(e) => {
                    changedInput(e);
                  }}
                />
                <label htmlFor="image">
                  <MdOutlineCloudUpload size={35} />
                  رفع الصورة
                </label>
              </>
            )}
          </div>
          <label htmlFor="name"> اسم المنتج </label>
          <input type="text" id="name" {...register("title")} />
          <Error text={errors["title"]?.message} />
          <label htmlFor="description">وصف المنتج</label>
          <input type="text" id="description" {...register("description")} />
          <Error text={errors["description"]?.message} />

          <label htmlFor="price">سعر المنتج</label>
          <input type="text" id="price" {...register("price")} />
          <Error text={errors["price"]?.message} />

          <label htmlFor="whatsapp">لينك الواتس للتواصل</label>
          <input type="text" id="whatsapp" {...register("whatsapp")} />
          <Error text={errors["whatsapp"]?.message} />

          <label htmlFor="facebook">لينك الفيس بوك للتواصل</label>
          <input type="text" id="facebook" {...register("facebook")} />
          <Error text={errors["facebook"]?.message} />

          <div className="btns">
            <button className="main-btn">
              {loading && <Spinner />}
              ارسال المنتج
            </button>
            <button
              className="secondary-btn"
              type="button"
              onClick={() => {
                setLightBox(!lightBox);
              }}
            >
              رفض
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        <div className="box" onClick={() => setLightBox(!lightBox)}>
          <PiCursorClick size={40} />
          <p>اضافة منتج</p>
        </div>
        {MY_PRODUCT}
      </div>
    </div>
  );
};

export default ProductSales;
