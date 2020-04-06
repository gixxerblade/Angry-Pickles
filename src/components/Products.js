import React, { useContext } from "react";
import { ProductsContext } from "./ProductsProvider";
import ProductThumbnail from "./ProductThumbnail";
import styled from "styled-components";
const Items = () => {
  const { listProducts } = useContext(ProductsContext);
  const products = listProducts();
  return (
    <StyledProductsDiv>
      {products.map((product) => (
        <ProductThumbnail key={product.id} product={product} />
      ))}
    </StyledProductsDiv>
  );
};

export default Items;
const StyledProductsDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  font-family: "Poppins", sans-serif;
`;
