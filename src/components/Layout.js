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
              <footer>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
              </footer>
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
  height: 100vh; !important
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`;
