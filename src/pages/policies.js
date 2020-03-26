import React from "react";
import Layout from "../components/Layout";
import VerticalTabs from "../components/Tabpanel";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
const Policies = () => {
  const logo = useStaticQuery(graphql`
    query TabPanelLogoQuery {
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
    <Layout>
      <br />
      <StyledDiv>
        <Link to="/home">
          <StyledImg
            fixed={logo.file.childImageSharp.fixed}
            alt="Angry Pickle Logo"
          />
        </Link>
        <StyledH1>Angry Pickles Shop Policies</StyledH1>
      </StyledDiv>
      <VerticalTabs />
    </Layout>
  );
};
export default Policies;

const StyledImg = styled(Img)`
  margin-bottom: 0.5rem;
  &:hover {
    transition: 0.2s linear;
    transform: scale(1.06);
  }
`;
const StyledDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  text-align: center;
`;
const StyledH1 = styled.h1`
  vertical-align: bottom;
  margin: 1rem;
`;
