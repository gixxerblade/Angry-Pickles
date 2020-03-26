import React, { useEffect } from "react";
import { Link } from "gatsby";
import BackGroundSection from "../components/BackgroundSection";
import styled from "styled-components";
import { Stripe } from "@stripe/stripe-js";

const Splash = () => {
  useEffect(() => {
    window.Stripe.setPublishableKey(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
  }, []);

  return (
    <>
      <BackGroundSection>
        <StyLink to="/home">
          <StyledH1>Enter</StyledH1>
        </StyLink>
      </BackGroundSection>
    </>
  );
};

export default Splash;

const StyledH1 = styled.h1`
  color: white;
  font-size: 4rem;
  font-family: "Poppins", sans-serif;
  &:hover {
    transform: scale(1.1);
    color: #fffa00;
  }
`;
const StyLink = styled(Link)`
  text-decoration: none;
`;
