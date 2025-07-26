import { FaHeart, FaPhone, FaUser } from "react-icons/fa";
import Title from "../Title/Title";
import { RiMenuAddLine } from "react-icons/ri";
import "./work.css";

const Work = () => {
  return (
    <div className="work">
      <Title text="كيف تعمل منصة تدويري" isShow={true} />
      <div className="spikes"></div>

      <div className="container">
        <div className="box">
          <span className="icon">
            <FaUser size={40} color="white" />
          </span>
          <div className="text">
            <span>1</span>
            <h2>سجل في المنصة</h2>
            <p>انشئ حسابك بسهولة وابداء رحلتك في اعادة التدوير</p>
          </div>
        </div>
        <div className="box">
          <span className="icon">
            <RiMenuAddLine size={40} />
          </span>
          <div className="text">
            <span>2</span>

            <h2>اختر الخدمة المناسبة </h2>
            <p>سواء كنت ترغب في بيع نفاياتك او اصلاح الاجهزة او التبرع بها</p>
          </div>
        </div>
        <div className="box">
          <span className="icon">
            <FaPhone size={40} />
          </span>
          <div className="text">
            <span>3</span>
            <h2>تواصل معانا</h2>
            <p>حدد موعدا لجمع النفايات او تقديم خدمات المطلوبة</p>
          </div>
        </div>
        <div className="box">
          <span className="icon">
            <FaHeart size={40} color="white" />
          </span>
          <div className="text">
            <span>4</span>
            <h2>ساهم في بيئة مستدامة</h2>
            <p>تضمن اعادة تدوير امنة ومسؤولة لكل المواد</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
