import {
  MdAutoFixHigh,
  MdOutlineDevicesOther,
  MdOutlinePublishedWithChanges,
} from "react-icons/md";
import "./services.css";
import { FaExchangeAlt, FaUserCheck } from "react-icons/fa";
import Title from "../Title/Title";
import { GiBookshelf } from "react-icons/gi";
import { FaVanShuttle } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";

const Services = () => {
  return (
    <div className="services">
      <Title text="خدامتنا" isShow={true} />
      <div className="content-serv">
        <div className="serv-box">
          <h2>
            <MdOutlineDevicesOther size={35} />
            جمع الأجهزة الإلكترونية التالفة
          </h2>
          <p>
            نوفر وسيلة سهلة وآمنة لجمع أجهزتك الإلكترونية القديمة أو التالفة، من
            الهواتف والحواسيب إلى الأجهزة الطرفية والملحقات.
          </p>
        </div>
        <div className="serv-box">
          <h2>
            <MdAutoFixHigh size={35} />
            حلول مخصصة للشركات والمؤسسات
          </h2>
          <p>
            نقدم خدمات ميدانية للشركات للتخلص من الأجهزة بشكل نظامي وآمن، مع
            تقديم تقارير توثيقية وشهادات إتلاف عند الحاجة.
          </p>
        </div>
        <div className="serv-box">
          <h2>
            <FaExchangeAlt size={35} />
            فرز وإعادة استخدام الأجهزة
          </h2>
          <p>
            نقوم بفرز الأجهزة القابلة لإعادة الاستخدام أو الإصلاح، ونعيد توجيهها
            للاستفادة منها بدلاً من التخلص منها نهائيًا.
          </p>
        </div>
        <div className="serv-box">
          <h2>
            <MdOutlinePublishedWithChanges size={35} />
            إعادة تدوير آمنة وصديقة للبيئة{" "}
          </h2>
          <p>
            نعمل مع شركاء معتمدين لإعادة تدوير المكونات الإلكترونية بطرق تحافظ
            على البيئة وتمنع تسرب المواد الضارة.
          </p>
        </div>
        <div className="serv-box">
          <h2>
            <GiBookshelf size={35} />
            نشر الوعي والتثقيف البيئي{" "}
          </h2>
          <p>
            نُنظم حملات ومبادرات توعوية لتعريف المجتمع بأهمية إعادة التدوير
            الإلكتروني وتأثيراته الإيجابية على البيئة والاقتصاد.
          </p>
        </div>
        <div className="serv-box">
          <h2>
            <FaVanShuttle size={35} />
            خدمة التوصيل والاستلام{" "}
          </h2>
          <p>
            نوفر خدمة استلام الأجهزة الإلكترونية من موقعك بكل سهولة وأمان، سواء
            كنت فردًا أو شركة. فقط حدّد موقعك .
          </p>
        </div>
        <div className="serv-box">
          <h2>
            <IoSettingsSharp size={35} />
            خدمة ما بعد التسليم{" "}
          </h2>
          <p>
            شهادات إتلاف أو إعادة تدوير معتمدة عند الطلب دعم فني واستشارات في
            حال كنت بحاجة لمزيد من المساعدة في تقييم .
          </p>
        </div>
        <div className="serv-box">
          <h2>
            <FaUserCheck size={35} />
            خدمة العملاء{" "}
          </h2>
          <p>
            في تدويري، رضاك هو أولويتنا. نوفر فريق دعم متخصص جاهز للرد على
            استفساراتك، مساعدتك في حجز المواعيد.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
