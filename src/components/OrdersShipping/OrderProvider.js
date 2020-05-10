import React, { createContext, useState, useEffect } from "react";
import { useFetch } from "../Fetcher";
export const OrderContext = createContext();
import { useIdentityContext } from "react-netlify-identity";

const OrderProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [error, setError] = useState(null);

  const identity = useIdentityContext();

  const generateHeaders = async () => {
    let headers = { "Content-Type": "application/json" };
    const token = await identity.getFreshJWT(); // is this asynchronous code ????
    if (identity.user) {
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }
    return headers;
  };
  /*   const { data, error, loading } = useFetch("/.netlify/functions/listOrders", {
    method: "GET",
    body: JSON.stringify(data),
  }); */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authHeaders = await generateHeaders();
        const response = await fetch("/.netlify/functions/listOrders", {
          method: "GET",
          headers: authHeaders,
          body: JSON.stringify(data),
        });
        const data = await response.json();
        const { data: order } = data;
        if (isSubscribed) {
          setData(order);
          setLoading(false);
          //console.log("Fetch Data: ", data);
          // console.log("useFetch has run");
        } else throw new Error("Cannot retrieve data");
      } catch (err) {
        setError(err);
        return "Error: ", err.message;
      }
    };
    fetchData();
    return () => {
      console.log("Unsubscribed!");
      setIsSubscribed(false);
    };
  }, []);

  return (
    <OrderContext.Provider value={{ data, loading, error }}>
      {children}
    </OrderContext.Provider>
  );
};
export default OrderProvider;
