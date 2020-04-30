import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

const ProductThumbnail = ({ product }) => {
  return (
    <ProductThumbnailBox key={product.id} style={{ breakInside: "avoid" }}>
      <StyledLink to={`/buy/${product.slug}`}>
        <StyledProductContainer>
          {product.localFiles && (
            <StyledProductThumb
              fluid={product.localFiles[0].childImageSharp.fluid}
              alt={product.name}
            />
          )}
          <StyledProductNamePrice>{product.name}</StyledProductNamePrice>
          <StyledProductNamePrice>
            ${product.skus[0].price / 100}
          </StyledProductNamePrice>
        </StyledProductContainer>
      </StyledLink>
    </ProductThumbnailBox>
  );
};

ProductThumbnail.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductThumbnail;

const ProductThumbnailBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 300px;
  height: 370px;
  margin: auto;
  padding: 10px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  color: #555;
  border-radius: 1em;
`;

const StyledProductNamePrice = styled.div`
  font-size: 1.15rem;
  font-weight: 600;
  text-align: center;
  margin-top: 0.5rem;
  white-space: normal;
`;
const StyledProductContainer = styled.div`
  max-width: 250;
  flex: 1 1 auto;
  margin: 0 2rem 0rem;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledProductThumb = styled(Img)`
  border-radius: 1rem;
`;
