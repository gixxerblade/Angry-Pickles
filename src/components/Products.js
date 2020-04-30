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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-flow: row;
  font-family: "Poppins", sans-serif;
  place-content: center;
  gap: 1rem;
`;
