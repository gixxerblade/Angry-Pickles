import { useState, useEffect } from "react";

export const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, options);
      const data = await response.json();
      const type = await response.ok;
      const { data: order } = data;
      if (isSubscribed && type===true) {
        setData(order);
        setLoading(false);
        console.log("JSON: ", type);
        console.log("Fetch Data: ", order);
      }
      else{
        throw new Error("HTTP status " + response.status);
      }
    };
    fetchData();
    return () => setIsSubscribed(false);
  }, []);
  return { data, loading };
};
