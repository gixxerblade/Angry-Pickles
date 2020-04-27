import { useState, useEffect } from "react";
import { navigate } from "gatsby";
export const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, options);
      const data = await response.json();
      const { data: order } = data;
      if (isSubscribed) {
        setData(order);
        setLoading(false);
        console.log("Fetch Data: ", order);
      }
    };
    fetchData();
    return () => setIsSubscribed(false);
  }, [data]);
  return { data, loading };
};
