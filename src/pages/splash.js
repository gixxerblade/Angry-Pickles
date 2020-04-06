import React from "react";
import { Link } from "gatsby";
import BackGroundSection from "../components/BackgroundSection";
import "../styles/splash.css";
const Splash = () => {
  return (
    <>
      <BackGroundSection>
        <a className="splash-h1" href="https://www.etsy.com/shop/AngryPickles">
          Enter
        </a>
        {/*         <Link className="splash-h1" to="/home">Enter</Link>
         */}{" "}
      </BackGroundSection>
    </>
  );
};

export default Splash;
