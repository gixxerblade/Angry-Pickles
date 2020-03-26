import React from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-duplicates
import { Link } from "gatsby";
import Cart from "./Cart";
import styled from "styled-components";
import Img from "gatsby-image";
// eslint-disable-next-line import/no-duplicates
import { useStaticQuery, graphql } from "gatsby";
import Navbar from "./Navbar";

const Header = ({ siteTitle }) => {
  const logo = useStaticQuery(graphql`
    query MyQuery {
      file(relativePath: { eq: "ap_logo.png" }) {
        childImageSharp {
          fixed(background: "white", width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  return (
    <StyledHeader>
      <StyledHeaderDiv>
        <StyleLogoDiv>
          <Link to="/home">
            <StyledImg
              fixed={logo.file.childImageSharp.fixed}
              alt="Angry Pickle Logo"
            />
          </Link>
          <StyledHeaderH1>
            <StyledH1Link to="/home">Angry Pickles</StyledH1Link>
          </StyledHeaderH1>
        </StyleLogoDiv>
        <Navbar />
        <Cart />
      </StyledHeaderDiv>
    </StyledHeader>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;

const StyledImg = styled(Img)`
  &:hover {
    transition: 0.2s linear;
    transform: scale(1.06);
  }
`;
const StyledHeader = styled.header`
  font-family: "Poppins", sans-serif;

  width: 100%;
  height: 11rem;
  background-color: #000000;
`;
const StyledHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
`;
const StyledHeaderH1 = styled.h1`
  margin: 2rem;
  color: #ebf2fa;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    /* Styles */
    text-align: center;
    margin-top: 0;
  }
`;
const StyledH1Link = styled(Link)`
  text-decoration: none;
  color: #ebf2fa;
  cursor: pointer;
  &:hover {
    color: #679436;
  }
`;
const StyleLogoDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-flow: row wrap;
  margin-top: 2rem;
`;
