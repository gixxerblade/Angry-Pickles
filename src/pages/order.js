import React from "react";
import Layout from "../components/Layout";
import Receipt from "../components/Receipt";
import { useFetch } from "../components/Fetcher";
import { UserContext } from "../components/UserContext";
const Order = () => {
  const { data, loading } = useFetch("/.netlify/functions/retrieve", {});
  const query = location.search;
  const re = /(?<name>\?id=)/g;
  let id = query.replace(re, "");
  // console.log(id);
  return (
    <Layout>
      <h1>Thank you for your order</h1>
      <h2>Your order number is: "{id}"</h2>
      <UserContext.Provider value={{ data, loading }}>
        <Receipt  />
      </UserContext.Provider>
    </Layout>
  );
};
export default Order;
