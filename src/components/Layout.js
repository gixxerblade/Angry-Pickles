import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Header from "./Header";
import ProductsProvider from "./ProductsProvider";
import CartProvider from "./CartProvider";
import "./layout.css";
import styled from "styled-components";
const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <ProductsProvider>
          <CartProvider>
            <Header siteTitle={data.site.siteMetadata.title} />
            <StyledLayoutDiv>
              <main>{children}</main>
              <StyledFooter>
                © {new Date().getFullYear()},{` `}
                <StyleFooterA href="https://www.stephenclark.dev">
                  Steve Clark
                </StyleFooterA>
              </StyledFooter>
            </StyledLayoutDiv>
          </CartProvider>
        </ProductsProvider>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;

const StyledLayoutDiv = styled.div`
  margin: 0 auto;
  max-width: 960px;
  height: 100vh;
  !importantpadding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`;
const StyledFooter = styled.footer`
  width: 100%;
  color: #000000;
  height: 1.7rem;
  font-family: "Poppins", sans-serif;
`;
const StyleFooterA = styled.a`
  text-decoration: none;
  color: #000000;
  &:hover {
    color: #679436;
  }
`;
