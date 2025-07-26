import { Player } from "@lottiefiles/react-lottie-player"


const Logo = () => {
  return (
    <div className="logo">
      <Player autoplay loop src={ "Animation/logo.json"} style={{height: "50px", width: "50px"}} />
      <h2 className="name-logo">منصة تدويري</h2>
    </div>
  )
}

export default Logo