import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Receipt from "../components/Receipt";
import { useFetch } from "../components/Fetcher";
import { UserContext } from "../components/UserContext";
import { any } from "prop-types";
import styled from "styled-components";
const Order = ({ location }) => {
  const query = location.search;
  const { data, loading } = useFetch(`/.netlify/functions/retrieve${query}`, {
    method: "GET"
  });

  /*
  In case use of plain text "id" is needed. 
  const re = /(?<name>\?id=)/g;
  let id = query.replace(re, ""); 

 */

  return (
    <Layout>
      <StyledDiv>
        <h2 style={{ marginTop: "1rem" }}>Thank you for your order!</h2>
        <UserContext.Provider value={{ data, loading }}>
          <Receipt />
        </UserContext.Provider>
      </StyledDiv>
    </Layout>
  );
};
export default Order;

Order.propTypes = {
  location: any.isRequired
};

const StyledDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const GetDate = styled.div`
  position: absolute;
`;
