import React from "react";
import OrderShippingTab from "./OrdersShipping/OrderShippingTab";
import styled from "styled-components";
import OrderProvider from "../components/OrdersShipping/OrderProvider";
import { Router } from "@reach/router";
import New from "./OrdersShipping/New"
import Completed from "./OrdersShipping/Completed"
// Area to connect to Stripe and Easy Post
const Shipping = () => {
  return (
    <>
      <br />
      <StyledContactH1>Orders & Shipping</StyledContactH1>
      <hr />
      <OrderProvider>
        <OrderShippingTab>
          <Router>
            <New  path="new"/>
            <Completed path="completed" />
          </Router>
        </OrderShippingTab>
      </OrderProvider>
    </>
  );
};
export default Shipping;

const StyledContactH1 = styled.h1`
  margin: 1rem;
  font-family: "Poppins", sans-serif;
`;
