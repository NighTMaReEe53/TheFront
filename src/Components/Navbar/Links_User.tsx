import { TbLockPassword } from "react-icons/tb";
import "./links-user.css";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { CiLogout } from "react-icons/ci";
import { BsCollection } from "react-icons/bs";

const Links_User = () => {
  const handleClicked = () => {
    setTimeout(() => {
      window.localStorage.clear();
      window.location.href = "/logins";
    }, 1500);

    toast.success("تم تسجيل الخروج بنجاح", {
      position: "top-center",
      duration: 1000,
    });
  };

  return (
    <div className="links-user">
      <Link to={"/profile"}>
        <FaRegUserCircle size={22} />
        <span>بروفايل الشخصي</span>
      </Link>
      <Link to={"/change"}>
        <TbLockPassword size={22} />
        <span>تغير كلمة السر</span>
      </Link>
      <Link to={"/product_sales"}>
        <BsCollection size={22} />
        <span>منتجاتك</span>
      </Link>
      <button className="danger-btn" onClick={handleClicked}>
        <CiLogout size={22} />
        تسجيل الخروج
      </button>
    </div>
  );
};

export default Links_User;
