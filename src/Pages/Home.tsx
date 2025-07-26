import { useEffect } from "react";
import Landing from "../Components/Landing/Landing";
import About from "../Components/About/About";
import Product from "../Product/Product";
import Category from "../Components/Category/Category";
import Work from "../Components/Work/Work";
import Contact from "../Components/Contact/Contact";
import News from "../Components/News/News";
import Marquee from "../Components/UI/marquee/Marquee";

const Home = () => {
  useEffect(() => {
    document.title = "الصفحة الرئيسية";
  }, []);

  return (
    <div className="home">
      <>
        <Landing />
        <Marquee />
        <About />
        <Category />
        <Product />
        <Work />
        <News />
        <Contact />
      </>
    </div>
  );
};

export default Home;
