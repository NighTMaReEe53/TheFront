import { FaRegUser } from "react-icons/fa";
import "../Styles/Profile.css";
import { MdOutlineMarkEmailRead, MdOutlinePlace } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User_Schema } from "../Validation/Index";
import Error from "../Components/Error/Index";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AxiosInterface, JWT_Parsing } from "../Components/Config/Axios";
import Spinner from "../Components/Spinner/Spinner";
import Logo from "../Components/Logo/Logo";
import Edit from "../../public/Animation/Edit.json";
import { Player } from "@lottiefiles/react-lottie-player";

interface IUser {
  username: string;
  email: string;
  phone: string;
  address: string;
}

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const ID_Stroage = window.localStorage.getItem("ID");
  const Id_Parsing = ID_Stroage ? JSON.parse(ID_Stroage) : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(User_Schema),
  });
  const onSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    setLoading(true);
    try {
      const { status } = await AxiosInterface.put(
        `/users/${Id_Parsing}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${JWT_Parsing}`,
          },
        }
      );
      if (status == 200) {
        toast.success("تم تعديل البيانات بنجاح الرجاء تسجيل الدخول مره اخر", {
          duration: 1500,
          position: "top-left",
        });
        window.localStorage.clear();
        setTimeout(() => {
          window.location.hash = "/";
        }, 1000);
      }
    } catch {
      toast.error("الاسم او بريد الالكتروني موجود بالفعل", {
        duration: 1500,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const userName_Storage = window.localStorage.getItem("Username");
  const email_Storage = window.localStorage.getItem("Email");
  const userName_Parsing = userName_Storage
    ? JSON.parse(userName_Storage)
    : null;
  const Email_Parsing = email_Storage ? JSON.parse(email_Storage) : null;

  useEffect(() => {
    document.title = "تعديل البيانات الشخصية";
  }, []);

  return (
    <div className="profile">
      <img src="image/shape/Shapes-1.png" className="shape-1" alt="" />
      <Player src={Edit} autoplay loop className="edit" />
      <div className="content">
        <div className="left">
          <Logo />
          <h2>تعديل البيانات الشخصية</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">
            <FaRegUser size={22} />
            اسم المستخدم
          </label>
          <input
            type="text"
            {...register("username")}
            placeholder={userName_Parsing}
          />
          <Error text={errors["username"]?.message} />
          <label htmlFor="email">
            <MdOutlineMarkEmailRead size={22} />
            البريد الالكتروني
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder={Email_Parsing}
          />
          <Error text={errors["email"]?.message} />

          <label htmlFor="phone">
            <CiPhone size={22} />
            رقم الهاتف
          </label>
          <input
            type="text"
            {...register("phone")}
            placeholder={"رقم الهاتف الخاص بك"}
          />
          <Error text={errors["phone"]?.message} />

          <label htmlFor="address">
            <MdOutlinePlace size={22} />
            العنوان
          </label>
          <input
            type="text"
            {...register("address")}
            placeholder={"العنوان الخاص بك"}
          />
          <Error text={errors["address"]?.message} />
          <button className="secondary-btn">
            {loading && <Spinner />}
            تحديث البيانات
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
