import { Link } from "react-router-dom";
import Logo from "../Components/Logo/Logo";
import "../Styles/Login.css";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Login_Schema } from "../Validation/Index";
import { AxiosInterface } from "../Components/Config/Axios";
import Error from "../Components/Error/Index";
import Spinner from "../Components/Spinner/Spinner";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import Loading from "../Components/Loading/Loading";

interface ILogin {
  identifier: string;
  password: string;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(Login_Schema),
  });
  const onSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
    setIsLoading(true);

    try {
      const { data: Info, status } = await AxiosInterface.post(
        "auth/local",
        data
      );
      if (status == 200) {
        toast.success("تم تسجيل الدخول بنجاح", {
          position: "top-left",
          duration: 2000,
        });
        setTimeout(() => {
          setLoading(true);
        }, 2100);
        window.localStorage.setItem("JWT", JSON.stringify(Info.jwt));
        window.localStorage.setItem("password", JSON.stringify(data.password));
        window.localStorage.setItem("Email", JSON.stringify(Info.user.email));
        window.localStorage.setItem(
          "Username",
          JSON.stringify(Info.user.username)
        );
        window.localStorage.setItem("ID", JSON.stringify(Info.user.id));
        setTimeout(() => {
          window.location.href = "/";
        }, 4000);
      }
    } catch {
      toast.error("الايميل الذي ادخلته او كلمة سر غير صحيحة", {
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "تسجيل الدخول";
  }, []);

  return (
    <div className="login">
      {loading ? null : (
        <>
          <img src="image/shape/Shapes-login.png" className="Shape-4" alt="" />
          <img src="image/shape/Shapes-1.png" className="Shape-1" alt="" />
        </>
      )}

      {loading ? (
        <div className="overlay-loading-login">
          <Loading />
          <h2>
            {" "}
            مرحبا بك داخل <Logo />
          </h2>
        </div>
      ) : (
        <div className="container">
          <div className="right">
            <Logo />
            <span>مرحبا بك عميلنا العزيز</span>
            <h2>تسجيل الدخول</h2>
            <span>نتمني لك السعادة معانا</span>
          </div>
          <div className="left">
            <Logo />
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email">
                <MdOutlineMailOutline size={22} />
                ادخل الايميل الخاص بك...
              </label>
              <input
                type="email"
                {...register("identifier")}
                id="email"
                placeholder="ادخل الايميل الخاص بك هنا"
              />
              <Error text={errors["identifier"]?.message} />
              <label htmlFor="password">
                <TbLockPassword size={22} />
                ادخل الباسورد الخاص بك...
              </label>
              <input
                type="password"
                {...register("password")}
                id="password"
                placeholder="ادخل الباسورد الخاص بك هنا"
              />
              <Error text={errors["password"]?.message} />
              <button
                type="submit"
                className={`secondary-btn ${isLoading && "disapled"}`}
              >
                {isLoading && <Spinner />}
                سجل الدخول
              </button>
              <h2 className="sign">
                ليس لديك حساب من قبل.. <Link to={"/register"}>انشاء حساب</Link>
              </h2>
            </form>
          </div>
        </div>
      )}

      {/* <div className="container">
        <div className="right">
          <Logo />
          <span>مرحبا بك عميلنا العزيز</span>
          <h2>تسجيل الدخول</h2>
          <span>نتمني لك السعادة معانا</span>
        </div>
        <div className="left">
          <Logo />
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">
              <MdOutlineMailOutline size={22} />
              ادخل الايميل الخاص بك...
            </label>
            <input
              type="email"
              {...register("identifier")}
              id="email"
              placeholder="ادخل الايميل الخاص بك هنا"
            />
            <Error text={errors["identifier"]?.message} />
            <label htmlFor="password">
              <TbLockPassword size={22} />
              ادخل الباسورد الخاص بك...
            </label>
            <input
              type="password"
              {...register("password")}
              id="password"
              placeholder="ادخل الباسورد الخاص بك هنا"
            />
            <Error text={errors["password"]?.message} />
            <button
              type="submit"
              className={`secondary-btn ${isLoading && "disapled"}`}
            >
              {isLoading && <Spinner />}
              سجل الدخول
            </button>
            <h2 className="sign">
              ليس لديك حساب من قبل.. <Link to={"/register"}>انشاء حساب</Link>
            </h2>
          </form>
        </div>
      </div> */}
    </div>
  );
};

export default Login;
