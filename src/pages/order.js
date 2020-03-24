import React from "react";
import Layout from "../components/Layout";
import Receipt from "../components/Receipt";
import { useFetch } from "../components/Fetcher";
import { UserContext } from "../components/UserContext";
import { any } from "prop-types";
const Order = ({ location }) => {
  const query = location.search;
  const { data, loading } = useFetch(
    `/.netlify/functions/retrieve${query}`,
    {}
  );
  const re = /(?<name>\?id=)/g;
  let id = query.replace(re, "");
  return (
    <Layout>
      <h1>Thank you for your order</h1>
      <h2>Your order number is: "{id}"</h2>
      <UserContext.Provider value={{ data, loading }}>
        <Receipt />
      </UserContext.Provider>
    </Layout>
  );
};
export default Order;

Order.propTypes = {
  location: any.isRequired
};
