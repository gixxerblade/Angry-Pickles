import React from "react";
import OrderShippingTab from "./OrdersShipping/OrderShippingTab";
import styled from "styled-components";
import OrderProvider from "../components/OrdersShipping/OrderProvider";

// Area to connect to Stripe and Easy Post
const Shipping = () => {
  return (
    <>
      <br />
      <StyledContactH1>Orders & Shipping</StyledContactH1>
      <hr />
      <OrderProvider>
        <OrderShippingTab />
      </OrderProvider>
    </>
  );
};
export default Shipping;

const StyledContactH1 = styled.h1`
  margin: 1rem;
  font-family: "Poppins", sans-serif;
`;
