import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Cart from "./Cart";
import styled from "styled-components";
import Img from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";
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
          <Img
            fixed={logo.file.childImageSharp.fixed}
            alt="Angry Pickle Logo"
          />
          <StyledHeaderH1>
            <StyledH1Link to="/">Angry Pickles</StyledH1Link>
          </StyledHeaderH1>
        </StyleLogoDiv>
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

const StyledHeader = styled.header`
  width: 100%;
  height: 9rem;
  background-color: #000000;
`;
const StyledHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
`;
const StyledHeaderH1 = styled.h1`
  margin: 2rem;
  color: #fff;
`;
const StyledH1Link = styled(Link)`
  text-decoration: none;
  color: #ffffff;
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
