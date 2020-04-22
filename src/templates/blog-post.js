import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import { StyledContactH1 } from "../pages/contact";
import styled from "styled-components";

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <StyledContactH1>{post.frontmatter.title}</StyledContactH1>
      <StyledDiv dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  );
};
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;


const StyledDiv = styled.div `
  font-family: "Poppins", sans-serif;

`