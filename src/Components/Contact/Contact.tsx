import { Player } from "@lottiefiles/react-lottie-player";
import Animation from "../../../public/Animation/Contact.json";
import "./contact.css";
import Title from "../Title/Title";
import { IoMdSend } from "react-icons/io";

const Contact = () => {
  return (
    <div className="contact">
      <Title text="تواصل معانا" />
      <div className="container">
        <div className="right">
          <form>
            <label htmlFor="name">ادخل اسمك</label>
            <input type="text" placeholder="ادخل اسمك هنا" id="name" />
            <label htmlFor="email">ادخل الايميل</label>
            <input
              type="text"
              placeholder="ادخل ايميل الخاص بك هنا"
              id="email"
            />
            <label htmlFor="message">ادخل الرسالة</label>
            <textarea
              id="message"
              placeholder="ادخل الرسالة الخاصة بك"
            ></textarea>
            <button className="secondary-btn">
              <IoMdSend size={22} />
              ارسال الرسالة
            </button>
          </form>
        </div>
        <div className="left">
          <Player src={Animation} loop autoplay />
        </div>
      </div>
    </div>
  );
};

export default Contact;
