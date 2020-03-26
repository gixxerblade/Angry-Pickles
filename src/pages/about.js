import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { Link } from "@reach/router";
const About = () => {
  const logo = useStaticQuery(graphql`
    query aboutLogo {
      file(relativePath: { eq: "ap_logo.png" }) {
        childImageSharp {
          fixed(background: "white", width: 200, height: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <StyledAboutDiv>
        <SEO
          title="About"
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
            `artisan`
          ]}
        />
        <Link to="/home">
          <StyledImg
            fixed={logo.file.childImageSharp.fixed}
            alt="Angry Pickle Logo"
          />
        </Link>
        <StyledAboutH1>Accidental Pickle Connoisseur</StyledAboutH1>
        <StyledAboutP>
          Retired Marine Corps veteran Stephen Clark regularly cans the
          vegetables from his garden, so pickled cucumbers were a natural
          extension of that passion. We hope to bring this awesome taste to your
          home. Angry Pickles uses fresh in-season produce, from various
          locations. We even grow a small selection of produce in our backyard.
          We want to give our customers crisp, crunchy and delicious pickled
          vegetables. Most of all, we want to expand people’s palates and give
          you the best pickle you’ve ever had.
        </StyledAboutP>
      </StyledAboutDiv>
    </Layout>
  );
};
export default About;

const StyledAboutH1 = styled.h1`
  margin: 1rem;
  text-align: center;
`;

const StyledAboutP = styled.p`
  text-align: justify;
`;

const StyledAboutDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  font-family: "Poppins", sans-serif;
`;
const StyledImg = styled(Img)`
  cursor: pointer;
  &:hover {
    transition: 0.2s linear;
    transform: scale(1.06);
  }
`;
