import { useEffect } from "react";
import Title from "../Components/Title/Title";
import "../Styles/sale.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Store/Store";
import { FETCH_DATA_SALE } from "../Store/Sale_Action/Sale_Slice";
import type { ISale_Product } from "../Interfaces/Index";
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { MY_URL_IMAGE } from "../Components/Config/Axios";

const Sale = () => {
  const { sale } = useSelector((state: RootState) => state.sale);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    document.title = " المبيعات";
  }, []);

  useEffect(() => {
    dispatch(FETCH_DATA_SALE());
  }, []);

  const MY_PRODUCT = sale.map((el: ISale_Product) => {
    return (
      <div className="sale-box" key={el.id}>
        <div className="image">
          <img src={`${MY_URL_IMAGE}${el.attributes.image}`} alt="" />
        </div>
        <h2>اسم المنتج :- {el.attributes.title}</h2>
        <p>وصف المنتج :- {el.attributes.description}</p>
        <span>السعر :- {el.attributes.price} EGP</span>
        <div className="info">
          <h2>التواصل من خلال :-</h2>
          <div className="btns">
            <a
              target="_blank"
              className="whatsapp"
              href={`${el.attributes.whatsapp}`}
            >
              <FaWhatsapp size={25} />
            </a>
            <a
              href={`${el.attributes.facebook}`}
              target="_blank"
              className="facebook"
              title="اذهب الي صفحة الفيس الخاصة بالعميل"
            >
              <CiFacebook size={25} />
            </a>
          </div>
        </div>
      </div>
    );
  });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<ISale>({
  //   resolver: yupResolver(Sale_Schema),
  // });
  // const onSubmit: SubmitHandler<ISale> = async (data: ISale) => {
  //   setLoading(true);

  //   try {
  //     const { status } = await AxiosInterface.post(
  //       "sales",
  //       {
  //         data: {
  //           title: data.title,
  //           description: data.description,
  //           price: data.price,
  //           whatsapp: data.whatsapp,
  //           facebook: data.facebook,
  //           image: image,
  //           users: [ID_Parsing],
  //         },
  //       },
  //       { headers: { Authorization: `Bearer ${JWT_Parsing}` } }
  //     );
  //     if (status == 200) {
  //       toast.success("تم رفع المنتج بنجاح علي قائمة المبيعات", {
  //         duration: 1500,
  //         position: "top-left",
  //       });
  //       setLightBox(!lightBox);
  //       data.description = "";
  //       data.facebook = "";
  //       data.price = "";
  //       data.title = "";
  //       data.facebook = "";
  //       dispatch(FETCH_DATA_SALE());
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const changedInput = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const formData = new FormData();

  //   formData.append("files", e.target.files[0]);

  //   const { data } = await AxiosInterface.post("upload", formData, {
  //     headers: { Authorization: `Bearer ${JWT_Parsing}` },
  //   });

  //   setImage(data[0].url);
  // };
  return (
    <div className="sale">
      {MY_PRODUCT.length ? (
        <>
          <Title text="المنتجات المعروضة للبيع" isShow={true} />
          <div className="container">{MY_PRODUCT}</div>
        </>
      ) : (
        <div className="overlay-sale">
          <MdOutlineReportGmailerrorred size={70} />
          لا توجد منتجات حالية معروضة للبيع
        </div>
      )}
    </div>
  );
};

export default Sale;
