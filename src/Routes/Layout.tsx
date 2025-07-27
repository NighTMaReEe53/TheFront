import { Outlet } from "react-router-dom";
import Nav from "../Components/Navbar/Nav";
import Drawer from "../Components/UI/Drawer/Drawer";
import Footer from "../Components/Footer/Footer";
import AudioPlayer from "react-h5-audio-player";

const Layout = () => {
  return (
    <>
      <Nav />
      <Drawer />

      <Outlet />
      <Footer />
      <AudioPlayer
        className="audio"
        autoPlay
        loop
        src="../../public/audio.MP3"
      />
    </>
  );
};

export default Layout;
