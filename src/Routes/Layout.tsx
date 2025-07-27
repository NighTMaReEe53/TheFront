import { Outlet } from "react-router-dom";
import Nav from "../Components/Navbar/Nav";
import Drawer from "../Components/UI/Drawer/Drawer";
import Footer from "../Components/Footer/Footer";
import AudioPlayer from "react-h5-audio-player";
import { useEffect } from "react";

const Layout = () => {
  const PLAY_AUDIO = async () => {
    const MY_AUDIO: HTMLAudioElement | null = document.querySelector(".audio");

    window.addEventListener("load", () => {
      MY_AUDIO?.play();
    });
  };

  useEffect(() => {
    PLAY_AUDIO();
  }, []);

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
