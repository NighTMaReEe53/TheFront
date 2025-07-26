import { useEffect } from "react";
import Title from "../Components/Title/Title";
import About from "../../public/Animation/About.json";
import Logo from "../Components/Logo/Logo";
import { Player } from "@lottiefiles/react-lottie-player";
import "../Styles/About.css"
import Services from "../Components/Services/Services";

const AboutPage = () => {
  useEffect(() => {
    document.title = "ماذا عنا";
  }, []);

  return (
    <div className="about-us">
      <Title text="من نحن" isShow={true} />
      <div className="container">
        <div className="box">
          <div className="text">
            <h2>
              نحن <Logo />
            </h2>
            <p>
              في تدويري، نؤمن بأن لكل جهاز إلكتروني عمر ثاني. نحن منصة مبتكرة
              متخصصة في جمع، وفرز، وإعادة تدوير النفايات الإلكترونية بشكل آمن
              ومستدام. انطلقنا برؤية واضحة: حماية البيئة من آثار النفايات
              الرقمية وتحويلها إلى فرص اقتصادية ومجتمعية. نُسهل على الأفراد
              والشركات التخلص المسؤول من أجهزتهم القديمة — مثل الهواتف،
              الحواسيب، الشواحن، وغيرها — ونعمل مع شركاء معتمدين لإعادة
              استخدامها أو إعادة تدويرها بطرق صديقة للبيئة.
            </p>
          </div>
          <div className="left">
            <Player src={About} autoplay loop />
          </div>
        </div>
        <Services />
      </div>
    </div>
  );
};

export default AboutPage;
