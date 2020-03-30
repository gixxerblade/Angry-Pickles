import React from "react";
import { Link } from "gatsby";
import BackGroundSection from "../components/BackgroundSection";
import styled from "styled-components";

const Splash = () => {
  return (
    <>
      <BackGroundSection>
        <StyLink to="/home">Enter</StyLink>
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
  font-family: "Poppins", sans-serif;
  color: white;
  font-size: 4rem;
  &:hover {
    transform: scale(1.1);
    color: #fffa00;}
`;
