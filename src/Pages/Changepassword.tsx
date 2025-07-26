import { useEffect, useState } from "react";
import Animation from "../../public/Animation/password.json";

import "../Styles/Changepassword.css";
import { Player } from "@lottiefiles/react-lottie-player";

import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { change_Schema } from "../Validation/Index";
import Error from "../Components/Error/Index";
import toast from "react-hot-toast";
import { AxiosInterface, JWT_Parsing } from "../Components/Config/Axios";
import Spinner from "../Components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import Logo from "../Components/Logo/Logo";
import { TbLockPassword } from "react-icons/tb";
import { PiPassword } from "react-icons/pi";

interface IChange {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

const Changepassword = () => {
  useEffect(() => {
    document.title = "تغير كلمة السر";
  }, []);

  const [loading, setLoading] = useState<boolean>(false);

  const naviage = useNavigate();

  const GET_PASSWORD = window.localStorage.getItem("password");
  const PASSWORD_PARSE = GET_PASSWORD ? JSON.parse(GET_PASSWORD) : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChange>({
    resolver: yupResolver(change_Schema),
  });
  const onSubmit: SubmitHandler<IChange> = async (data: IChange) => {
    setLoading(true);

    if (PASSWORD_PARSE != data.currentPassword) {
      toast.error("كلمة السر القديمة خطاء او كلمة السر الجديدة ليس نفس بعض", {
        duration: 1500,
        position: "top-left",
      });
    } else if (data.password != data.passwordConfirmation) {
      toast.error("كلمة السر الجديدة غير متطابقة", {
        duration: 1500,
        position: "top-center",
      });
    }

    try {
      const { status } = await AxiosInterface.post(
        "auth/change-password",
        data,
        {
          headers: {
            Authorization: `Bearer ${JWT_Parsing}`,
          },
        }
      );
      if (status == 200) {
        toast.success("تم تغيير كلمة السر بنجاح", {
          position: "top-left",
          duration: 1500,
        });
        data.currentPassword = "";
        data.password = "";
        data.passwordConfirmation = "";
        setTimeout(() => {
          naviage("/");
        }, 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change">
      <Player src={Animation} autoplay loop className="effect" />
      <img src="image/shape/Shapes-1.png" alt="" />
      <div className="content">
        <div className="left">
          <Logo />
          <h2>تغير كلمة السر</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">
            <PiPassword size={22} />
            كلمة المرور القديمة
          </label>
          <input
            type="password"
            placeholder="ادخل كلمة السر القديمة هنا"
            {...register("currentPassword")}
          />
          <Error text={errors["currentPassword"]?.message} />
          <label htmlFor="">
            <TbLockPassword size={22} />
            كلمة المرور الجديدة
          </label>
          <input
            type="password"
            placeholder="ادخل كلمة السر الجديدة هنا"
            {...register("password")}
          />
          <Error text={errors["password"]?.message} />

          <label htmlFor="">
            <TbLockPassword size={22} />
            تأكيد كلمة المرور الجديدة
          </label>
          <input
            type="password"
            placeholder="ادخل كلمة السر الجديدة مرة اخري"
            {...register("passwordConfirmation")}
          />
          <Error text={errors["passwordConfirmation"]?.message} />

          <button className="main-btn">
            {" "}
            {loading && <Spinner />} تغيير كلمة السر
          </button>
        </form>
      </div>
    </div>
  );
};

export default Changepassword;
