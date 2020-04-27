import React from "react";
import { Link } from "gatsby";
import { useFetch } from "./Fetcher";
// Area to connect to Stripe and Easy Post
const Shipping = () => {
  const { data, loading } = useFetch("/.netlify/functions/listOrders", {});
   console.log(data.data)
  /* const paidList = data.data.map((order) => {
    return <li key={order.id}>{order.id}</li>;
  }); */
  return (
    <>
      <h1>TODO: make panel for Shipping using Easy Post</h1>
{/*       <ul>{paidList}</ul>
 */}    </>
  );
};
export default Shipping;
