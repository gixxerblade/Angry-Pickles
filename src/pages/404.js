import React from "react";
import { SadTear } from "@styled-icons/fa-solid/SadTear";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import styled from "styled-components";
// eslint-disable-next-line import/no-duplicates
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
// eslint-disable-next-line import/no-duplicates
import { Link } from "gatsby";
const NotFoundPage = () => {
  const logo = useStaticQuery(graphql`
    query FourOhFour {
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
      <Styled404Div>
        <SEO title="404: Not found" />
        <h1>NOT FOUND</h1>
        <SadTear size="50" />
        <Styled404P>
          You just hit a route that doesn&#39;t exist... the sadness. 😭
        </Styled404P>
        <Link to="/">
          <StyledImg
            fixed={logo.file.childImageSharp.fixed}
            alt="Angry Pickle Logo"
          />
        </Link>
      </Styled404Div>
    </Layout>
  );
};

export default NotFoundPage;

const Styled404Div = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
  font-family: "Poppins", sans-serif;
`;
const Styled404P = styled.p`
  margin: 1rem;
  text-align: justify;
  font-size: 1.5rem;
`;

const StyledImg = styled(Img)`
  &:hover {
    transition: 0.2s linear;
    transform: scale(1.06);
  }
`;
