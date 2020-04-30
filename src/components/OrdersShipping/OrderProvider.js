import React, { createContext } from "react";
import { useFetch } from "../Fetcher";
export const OrderContext = createContext();
const OrderProvider = ({ children }) => {
  const { loading, data, error } = useFetch("/.netlify/functions/listOrders", {
    method: "GET",
  });
  return (
    <OrderContext.Provider value={{ loading, data }}>
      {children}
    </OrderContext.Provider>
  );
};
export default OrderProvider;
