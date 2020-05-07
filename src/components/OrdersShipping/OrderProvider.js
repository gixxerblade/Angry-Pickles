import React, { createContext } from "react";
import { useFetch } from "../Fetcher";
export const OrderContext = createContext();
const OrderProvider = ({ children }) => {
  const { data, loading, error } = useFetch("/.netlify/functions/listOrders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  });
  return (
    <OrderContext.Provider value={{ data, loading, error }}>
      {children}
    </OrderContext.Provider>
  );
};
export default OrderProvider;
