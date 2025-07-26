import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import "./Landing.css";
import { motion } from "motion/react";

const Landing = () => {
  return (
    <div className="landing">
      <div className="container">
        <div className="image">
          <motion.img
            initial={{ opacity: 0.8, width: "750px" }}
            whileInView={{ opacity: 1, width: "500px" }}
            transition={{ duration: 0.3, delay: 0.6 }}
            src="image/Landing/Shape.png"
            className="shape-1"
            alt=""
          />
          <motion.img
            src="image/Landing/Shape-1.png"
            className="shape-2"
            alt=""
          />
        </div>

        <div className="text">
          <div className="title">
            <img src="image/Landing/Shape-2.png" alt="" />
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              منصة تدويري – لحلول ذكية في إدارة النفايات الإلكترونية
            </motion.h2>
          </div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            تُعد منصة تدويري مبادرة رقمية مبتكرة تهدف إلى معالجة التحديات
            المتزايدة المرتبطة بالنفايات الإلكترونية في العالم العربي. تعمل
            المنصة على جمع وفرز وإعادة تدوير الأجهزة الإلكترونية التالفة مثل
            الهواتف، وأجهزة الحاسوب، والشواحن، والبطاريات، وذلك من خلال شبكة من
            الشركاء المعتمدين ومراكز التجميع.
          </motion.p>
        </div>
      </div>
      <a className="down" href="#about">
        <MdKeyboardDoubleArrowDown size={40} color="var(--mainColor)" />
      </a>
    </div>
  );
};

export default Landing;
