import React from "react";
import BackGroundSection from "../components/BackgroundSection";
import "../styles/splash.css";
import SEO from "../components/SEO";
// import { Link } from "gatsby";
const Splash = () => {
  return (
    <>
      <BackGroundSection>
        <SEO
          title="Welcome to Angry Pickles"
          keywords={[
            `Angry Pickles`,
            `Pickles`,
            `gourmet pickles`,
            `handmade`,
            `spicy`,
            `dill`,
            `kosher`,
            `gluten free`,
            `comfort food`,
            `power food`,
            `homemade`,
            `artisan`,
          ]}
        />

        <a className="splash-h1" href="https://www.etsy.com/shop/AngryPickles">
          Enter
        </a>
        {/*         <Link className="splash-h1" to="/home">Enter</Link>
         */}
      </BackGroundSection>
    </>
  );
};

export default Splash;
