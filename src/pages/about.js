import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import styled from "styled-components";
const About = () => {
  return (
    <Layout>
      <StyledAboutDiv>
        <SEO title="About" keywords={[`Angry Pickles`, `Pickles`]} />
        <StyledAboutH1>Accidental Pickle Connoisseur</StyledAboutH1>
        <StyledAboutP>
          Retired Marine Corps veteran Stephen Clark regularly cans the
          vegetables from his garden, so pickled cucumbers were a natural
          extension of that passion. Giving canned goods to his friends as
          gifts, Stephen has been told time and time again that he made pickles
          to die for. During a large local event, Stephen was asked to mass
          produce his pickle recipe for 600 cyclists; to give them something
          they would enjoy and would make their event memorable. The result was
          the original Angry Pickle that was enjoyed by all. We hope to bring
          this awesome taste to your home. Angry Pickles uses fresh in-season
          produce, from various locations. We even grow a small selection of
          produce in our backyard. We want to give our customers crisp, crunchy
          and delicious pickled vegetables. Most of all, we want to expand
          people’s palates and give you the best pickle you’ve ever had.
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
  margin-top: 10rem;
  font-family: 'Poppins', sans-serif;
`;
