import React from "react";
import Cart from "./Cart";
import styled from "styled-components";
import Img from "gatsby-image";
import { useStaticQuery, graphql, Link } from "gatsby";
import MobileNavbar from "./MobileNavbar";
import Burger from "./burger";

const MobileHeader = () => {
  const logo = useStaticQuery(graphql`
    query MobileHeaderQuery {
      file(relativePath: { eq: "ap_logo.png" }) {
        childImageSharp {
          fixed(background: "white", width: 125, height: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  return (
    <StyledHeader>
      <Link to="/home">
        <StyledImg
          fixed={logo.file.childImageSharp.fixed}
          alt="Angry Pickle Logo"
        />
      </Link>
      <Cart />
    </StyledHeader>
  );
};
export default MobileHeader;

const StyledImg = styled(Img)`
  left: 50%;
  transform: translate(-50%);
  top: 2rem;
  width: 100%;
  margin: auto;
`;
const StyledHeader = styled.header`
  position: relative;
  font-family: "Poppins", sans-serif;
  width: 100%;
  height: 11rem;
  background-color: #000000;
`;
