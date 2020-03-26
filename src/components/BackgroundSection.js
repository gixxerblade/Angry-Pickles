import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";

import BackgroundImage from "gatsby-background-image";

/**
 * In this functional component a fullscreen <BackgroundImage />  is created.
 * @param className   string    className(s) from styled-components.
 * @param children    nodes     Child-components.
 * @return {*}
 * @constructor
 */
const FullBackground = ({ className, children }) => {
  const { desktop } = useStaticQuery(
    graphql`
      query {
        desktop: file(relativePath: { eq: "ap_logo.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `
  );

  // Single Image Data
  const imageData = desktop.childImageSharp.fluid;

  return (
    <StyledFullScreenWrapper>
      <BackgroundImage
        Tag="section"
        className={className}
        fluid={imageData}
        backgroundColor={`rgba(189, 210, 166, 1)`}
        title="Angry Pickles"
        id="fullscreenbg"
        role="img"
        aria-label="Fullscreen Background"
        preserveStackingContext={false}
      >
        {children}
      </BackgroundImage>
    </StyledFullScreenWrapper>
  );
};

const StyledFullBackground = styled(FullBackground)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-size: contain;
`;
const StyledFullScreenWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
`;

export default StyledFullBackground;
