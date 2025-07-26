import { CiSquareCheck } from "react-icons/ci";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { IoMdArrowDropleft } from "react-icons/io";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import "./footer.css"

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <Logo />
        <div className="content">
          <div className="box">
            <li>
              <CiSquareCheck size={22} color="var(--mainColor)" />
              تدويري.. حيث تتحول نفاياتك الإلكترونية إلى قيمة مستدامة!
            </li>
            <li>
              <CiSquareCheck size={22} color="var(--mainColor)" />
              منصة تدويري – لحياة رقمية نظيفة ومستقبل أخضر.
            </li>
            <li>
              <CiSquareCheck size={22} color="var(--mainColor)" />
              قل وداعًا للنفايات الإلكترونية، ومرحبًا بالحلول الذكية مع تدويري.
            </li>
            <li>
              <CiSquareCheck size={22} color="var(--mainColor)" />
              نحو بيئة رقمية مستدامة.. تدويري تجمع، تفرز، وتعيد الحياة لأجهزتك
              القديمة.
            </li>
            <li>
              <CiSquareCheck size={22} color="var(--mainColor)" />
              تدويري تربطك بأفضل الطرق للتخلص الآمن والمسؤول من النفايات
              الإلكترونية.
            </li>
          </div>
          <div className="box-link">
            <h2>الصفحات</h2>
            <Link to={"/"}>
              <IoMdArrowDropleft size={25} />
              الصفحة الرئيسية
            </Link>
            <Link to={"/about"}>
              <IoMdArrowDropleft size={25} />
              ماذا عنا
            </Link>
            <Link to={"/products"}>
              <IoMdArrowDropleft size={25} />
              المنتجات
            </Link>
          </div>
          <div className="box-contact">
            <h2>تواصل معانا</h2>
            <button className="facebook">
              <FaFacebookF size={25} />
            </button>
            <button className="twitter">
              <FaWhatsapp size={25} />
            </button>
            <button className="instgram">
              <FaInstagram size={25} />
            </button>
            <button className="linked">
              <FaLinkedinIn size={25} />
            </button>
          </div>
        </div>
        <p className="copyright">تم انشاء بواسطة <span>فريق العمل</span></p>
      </div>
    </div>
  );
};

export default Footer;
