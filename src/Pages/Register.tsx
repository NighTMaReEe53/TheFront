import { Fragment, useEffect, useState } from "react";
import "../Styles/Register.css";
import Logo from "../Components/Logo/Logo";
import { IRegister_Form } from "../Components/Data/Index";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Register_Schema } from "../Validation/Index";
import Error from "../Components/Error/Index";
import { AxiosInterface } from "../Components/Config/Axios";
import toast from "react-hot-toast";
import Spinner from "../Components/Spinner/Spinner";
import { Link, useNavigate } from "react-router-dom";

interface IInputs {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  // State
  const [Isloading, setIsLoading] = useState<boolean>(false);

  const naviagte = useNavigate();

  // ----------------------------------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>({
    resolver: yupResolver(Register_Schema),
  });
  const onSubmit: SubmitHandler<IInputs> = async (data: IInputs) => {
    setIsLoading(true);

    try {
      const { status } = await AxiosInterface.post("auth/local/register", data);
      if (status == 200) {
        toast.success(
          " تم انشاء الحساب بنجاح سوف يتم تحويلك لصفحة تسجيل الدخول",
          {
            position: "top-left",
            duration: 2000,
          }
        );
        naviagte("/logins");
      }
    } catch {
      toast.error("عذرا هذا الحساب موجود من قبل", {
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------------------------------

  useEffect(() => {
    document.title = "انشاء الحساب";
  }, []);

  const MY_INPUT = IRegister_Form.map((inp, i) => {
    return (
      <Fragment key={i}>
        <label htmlFor={inp.name}>{inp.label}</label>
        <input
          type={inp.type}
          {...register(inp.name)}
          id={inp.name}
          placeholder={inp.placeholder}
        />
        <Error text={errors[inp.name]?.message} />
      </Fragment>
    );
  });

  return (
    <div className="register">
      <img src="image/shape/Shapes-1.png" className="Shapes-1" alt="" />
      <img src="image/shape/Shapes-3.png" className="Shapes-3" alt="" />
      <div className="content">
        <div className="container">
          <div className="right">
            <Logo />
            <form onSubmit={handleSubmit(onSubmit)}>
              {MY_INPUT}
              <button
                type="submit"
                className={`main-btn ${Isloading && "disapled"}`}
              >
                {Isloading && <Spinner />}
                انشاء الحساب
              </button>
              <h2 className="sign">
                لديك حساب من قبل <Link to={"/logins"}>تسجيل الدخول ؟</Link>
              </h2>
            </form>
          </div>
          <div className="left">
            <img src="image/shape/Shapes-2.png" className="Shapes-2" alt="" />
            <Logo />
            <span>اهلا وسهلا بك في منصة تدويري</span>
            <h2 className="name">انشاء حساب</h2>
            <span>نتمني لك السعادة معانا</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
