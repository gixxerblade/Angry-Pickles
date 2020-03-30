import React from "react";
import { Link } from "gatsby";
import BackGroundSection from "../components/BackgroundSection";
import "../styles/splash.css"
const Splash = () => {
  return (
    <>
      <BackGroundSection>
        <Link className="splash-h1" to="/home">Enter</Link>
      </BackGroundSection>
    </>
  );
};

export default Splash;

