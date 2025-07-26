import Logo from "../Logo/Logo";
import Title from "../Title/Title";
import "./about.css";
import { IoCheckmarkDone } from "react-icons/io5";

import { motion } from "motion/react";

const About = () => {
  return (
    <div className="about" id="about">
      <img src="image/shape/Shape-6.png" className="shape-6" alt="" />
      <img src="image/shape/Shape-7.png" className="shape-7" alt="" />
      <Title text="ماذا عنا" />
      <div className="container">
        <div className="text">
          <Logo />
          <motion.h2
            initial={{ x: 10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            تدويري هي منصة إلكترونية رائدة متخصصة في إدارة وتدوير النفايات
            الإلكترونية بطريقة آمنة ومستدامة نهدف إلى :-
          </motion.h2>
          <ul>
            <motion.li
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <IoCheckmarkDone
                size={25}
                color="var(--mainColor)"
                style={{ marginLeft: "10px" }}
              />
              حماية البيئة من الأضرار الناتجة عن التخلص العشوائي من الأجهزة
            </motion.li>
            <motion.li
              initial={{ y: -10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <IoCheckmarkDone
                size={25}
                color="var(--mainColor)"
                style={{ marginLeft: "10px" }}
              />
              تعزيز مفهوم الاقتصاد الدائري من خلال إعادة استخدام وتدوير الموارد.
            </motion.li>
            <motion.li
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <IoCheckmarkDone
                size={25}
                color="var(--mainColor)"
                style={{ marginLeft: "10px" }}
              />
              نشر الوعي المجتمعي حول أهمية التخلص السليم من النفايات
              الإلكترونية.
            </motion.li>
            <motion.li
              initial={{ y: -10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1 }}
            >
              <IoCheckmarkDone
                size={25}
                color="var(--mainColor)"
                style={{ marginLeft: "10px" }}
              />
              مع تدويري، نعيد للحياة ما اعتُبر نفايات، ونساهم في مستقبل أكثر
              استدامة.
            </motion.li>
          </ul>
        </div>
        <div className="image">
          <motion.img
            initial={{ x: -100, opacity: 0.8 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            src="image/About.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default About;
