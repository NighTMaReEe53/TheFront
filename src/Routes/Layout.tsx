import { Outlet } from "react-router-dom";
import Nav from "../Components/Navbar/Nav";
import Drawer from "../Components/UI/Drawer/Drawer";
import Footer from "../Components/Footer/Footer";

const Layout = () => {
  return (
    <>
      <Nav />
      <Drawer />

      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
