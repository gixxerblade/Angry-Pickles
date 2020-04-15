import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Header from "./Header";
import ProductsProvider from "./ProductsProvider";
import CartProvider from "./CartProvider";
import "./layout.css";
import styled, { css } from "styled-components";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "./MobileHeader";
import OpenProvider from "./openContext";
import Burger from "./burger";
import MobileNavbar from "./MobileNavbar";
const Layout = ({ children }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1025px)",
  });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1024 });

  return (
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
      render={(data) => (
        <>
          <ProductsProvider>
            <CartProvider>
              <OpenProvider>
                {isDesktopOrLaptop && (
                  <Header siteTitle={data.site.siteMetadata.title} />
                )}
                {isTabletOrMobile && <MobileHeader />}
                <StyledLayoutDiv>
                  <main>{children}</main>
                  {isTabletOrMobile && <Burger />}
                  {isTabletOrMobile && <MobileNavbar />}
                  <StyledFooter>
                    ©{new Date().getFullYear()}&nbsp;
                    <StyleFooterA href="https://www.stephenclark.dev">
                      Steve Clark
                    </StyleFooterA>
                  </StyledFooter>
                </StyledLayoutDiv>
              </OpenProvider>
            </CartProvider>
          </ProductsProvider>
        </>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
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
  @media screen and (max-width: 1024px) {
    max-width: 100%;
    overflow-x: hidden;
  }
`;
const StyledFooter = styled.footer`
  width: 100%;
  color: #000000;
  height: 1.7rem;
  text-align: center;
  font-family: "Poppins", sans-serif;
  margin-top: 1rem;
`;
const StyleFooterA = styled.a`
  text-decoration: none;
  color: #000000;
  &:hover {
    color: #679436;
  }
`;
