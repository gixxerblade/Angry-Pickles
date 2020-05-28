import { useState, useEffect } from "react";
 export const useFetch = (url, options) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
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
      //console.log("Unsubscribed!");
      setIsSubscribed(false);
    };
  }, []);
  return { data, loading, error };
};
 