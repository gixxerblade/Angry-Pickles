import React, { createContext, useState, useEffect } from "react";
import { useIdentityContext } from "react-netlify-identity";
import { useLocation } from "@reach/router";
// Create context for contextual use throughout protected area to load order data
export const OrderContext = createContext();
const OrderProvider = ({ children }) => {
  //Get the location of the current page @reach-router useLocation hook
  const location = useLocation();
  //Initial states of data, loading, subscriptions, and errors
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [error, setError] = useState(null);

  //Identity instance. Check if user logged in to give access to Netlify function
  const identity = useIdentityContext();

  // Promise to compose JWT for access to listOrders function using Netlify Identity.
  // Returns "Unauthorized" if user is not logged in
  // Returns data is user is authorized
  const generateHeaders = async () => {
    let headers = { "Content-Type": "application/json" };
    const token = await identity.getFreshJWT();
    if (identity.user) {
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }
    return headers;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set the headers for authorization
        const authHeaders = await generateHeaders();
        // Fetch data
        const response = await fetch("/.netlify/functions/listOrders", {
          method: "GET",
          headers: authHeaders,
          body: JSON.stringify(data),
        });
        const data = await response.json();
        // Destructuring data as order
        const { data: order } = data;
        if (isSubscribed) {
          // Set data to order
          setData(order);
          setLoading(false);
        } else throw new Error("Cannot retrieve data");
      } catch (err) {
        setError(err);
        return "Error: ", err.message;
      }
    };
    fetchData();
    //Cleanup operations
/*     return () => {
      setIsSubscribed(false);
      console.log("Unsubscribed!");
    };
 */  }, [location.href]);

  return (
    <OrderContext.Provider value={{ data, loading, error }}>
      {children}
    </OrderContext.Provider>
  );
};
export default OrderProvider;
