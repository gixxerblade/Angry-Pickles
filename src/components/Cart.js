import React, { useContext } from "react";
import { CartContext } from "./CartProvider";
import Checkout from "./Checkout";
import CartItem from "./CartItem";
import styled from "styled-components";
import { ShoppingCart } from "@styled-icons/fa-solid/ShoppingCart";
import { LeftArrowSquare } from "@styled-icons/boxicons-solid/LeftArrowSquare";
const Cart = () => {
  const { cart, count, mode, toggle } = useContext(CartContext);
  return (
    <>
      {mode ? (
        <StyledShoppingCartDiv>
          <StyledLeftArrow onClick={() => toggle()} size="35" />
        </StyledShoppingCartDiv>
      ) : (
        <ActiveStyledShoppingCartDiv>
          <StyledShoppingCart onClick={() => toggle()} size="35" />
        </ActiveStyledShoppingCartDiv>
      )}
      <StyledCartDiv
        style={{
          display: mode ? "initial" : "none"
        }}
      >
        <StyledCartH1>Cart</StyledCartH1>
        {count === 0 && <StyledCartSpan>No items in cart.</StyledCartSpan>}
        {cart.map(([sku, quantity]) => (
          <CartItem key={sku.id} sku={sku} quantity={quantity} />
        ))}
        {count === 0 ? "" : <Checkout />}
      </StyledCartDiv>
    </>
  );
};

export default Cart;

const ActiveStyledShoppingCartDiv = styled.div`
  transition: 0.2s linear;
  top: 2.25rem;
  position: fixed;
  width: 3rem;
  height: 3rem;
  background-color: #ebf2fa;
  border-radius: 1.5rem;
  right: 1rem;
`;
const StyledShoppingCartDiv = styled.div`
  position: fixed;
  width: 3rem;
  height: 3rem;
  background-color: #ebf2fa;
  border-radius: 1.5rem;
  right: 1rem;
  top: 2rem;
  z-index: 2;
  &:target {
    transition: 0.2s linear;
    top: 2rem;
  }
`;
const StyledShoppingCart = styled(ShoppingCart)`
  z-index: 2;
  color: #679436;
  display: inline-block;
  margin: 0.5rem 0.5rem;
  &:hover {
    transition: 0.2s linear;
    transform: scale(1.1);
  }
`;
const StyledLeftArrow = styled(LeftArrowSquare)`
  z-index: 2;
  color: #679436;
  display: inline-block;
  margin: 0.5rem 0.5rem;
  &:hover {
    transition: 0.2s linear;
    transform: scale(1.1);
  }
`;
const StyledCartDiv = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  padding: 2rem;
  background-color: #ebf2fa;
  max-width: 25rem;
  z-index: 1;
  border-left: 1px solid black;
`;
const StyledCartH1 = styled.h1`
  color: green;
  -webkit-text-stroke: 0.5px yellow;
`;
const StyledCartSpan = styled.span`
  background-color: black;
  color: white;
  margin-right: 1rem;
`;
