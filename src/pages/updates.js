import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { Link, graphql } from "gatsby";
import { StyledContactH1 } from "./contact";
import styled from "styled-components"
const Updates = ({ data }) => {
  const htmlMarkup = () => {
    return { __html: data.allMarkdownRemark.edges[0].node.html };
  };
  console.log(data.allMarkdownRemark.edges[0].node.html);
  return (
    <Layout>
      <SEO
        title="Home"
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
          `artisanal`,
        ]}
      />
      <StyledContactH1>Updates</StyledContactH1>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <StyledDiv id={node.id}>
          <Link to={node.fields.slug}>
            <h3>
              {node.frontmatter.title} — <span>{node.frontmatter.date}</span>
            </h3>
          </Link>
          <p>{node.excerpt}</p>
        </StyledDiv>
      ))}
    </Layout>
  );
};
export default Updates;

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            date
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

const StyledDiv = styled.div `
  font-family: "Poppins", sans-serif;

`